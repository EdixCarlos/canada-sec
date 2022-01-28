import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';
import { TicketCreateModalComponent } from './ticket-create-modal/ticket-create-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MyTicketsService } from 'src/app/core/_services/my-tickets.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { SERVICES, SUB_SERVICES, TicketStatusJSON, TicketType } from 'src/app/shared/constants';
import { CommonService } from 'src/app/core/_services/common.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { ExportService } from 'src/app/core/_services/export.service';
import { fromEvent, merge, of, Subject, } from 'rxjs';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MyTicketsComponent implements OnInit {
  private lastIndexSelected = null;

  expandedElement: any | null = true;
  //Default Table
  displayedColumns = ["numero", "tipo", "estado", "tiempos", "fechaCreacion", "solicitante", "acciones"];

  dataSource: MatTableDataSource<any>;
  resultsLength = 0;
  size = 10;

  filterString = '';
  filterChanged = new EventEmitter<any>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild('filterInput', { static: true }) filterInput: ElementRef;

  public ticketStatus = TicketStatusJSON;
  public ticketType = TicketType;
  public type;

  constructor(
    public dialog: MatDialog,
    private myTicketsService: MyTicketsService,
    private router: Router,
    private utils: CommonService,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private exportService: ExportService,
  ) {
  }

  ngOnInit(): void {
    this.listenFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length >= 3) {
      this.filterString = filterValue.trim().toLowerCase();
      this.filterChanged.emit();
    }
  }

  listenFilter() {
    fromEvent(this.filterInput.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {

      this.filterString = text;
      this.filterChanged.emit();

    });
  }

  getTicketDetail(index, row) {
    if (this.lastIndexSelected && this.lastIndexSelected == index) {
      this.expandedElement = null;
      this.lastIndexSelected = null;
    } else {
      this.expandedElement = row;
      let data = this.dataSource.data;
      if (!data[index].history) {
        this.myTicketsService.getTicketDetailById(row.id).subscribe(history => {
          this.utils.showLoader();
          if (history && history.length > 0) {
            history.map((el, i) => {
              el.data = JSON.parse(history[i].data);
              return el;
            });
            data[index].history = history;
            this.dataSource.data = data;
            this.ref.detectChanges();
          }
          this.utils.hideLoader();
        });
      }
      this.lastIndexSelected = index;
    }
  }

  goToTicket(row) {
    let path = '';

    if (row.idTicketType === 17 || row.idTicketType === 18 || row.idTicketType === 19) {
      path = `tickets/vulnerability-management/app-vul-scan/${(row.idTicketType === 17 ? 'ip360' : row.idTicketType === 18 ? 'web-ins' : 'ser-har')}/view/${row.id}`;
    } else {
      let subService = SUB_SERVICES.find(s => s.id === row.idTicketType);
      let servicePath = SERVICES.find(serv => serv.id === subService.idServicio).code;

      if (row.idParent) {
        path = `tickets/${servicePath}/${subService.code}/view/${row.id}/${row.idParent}`;
      } else {
        path = `tickets/${servicePath}/${subService.code}/view/${row.id}`;
      }
    }

    this.router.navigateByUrl(path);
  }

  openModal() {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();

    const materialDialogConf = modalConfig.buildModalConfig('450px', {});
    const dialogRef = this.dialog.open(TicketCreateModalComponent, materialDialogConf);

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
    });
  }

  excelColumns = [
    'id',
    'desTicketType',
    'desStatus',
    'timeCreation',
    'requestDate',
    'requesterName',
  ];

  export(): void {
    let globalArray: any = [];
    const date = new Date();
    const end = +date;
    const start = +date.setDate(date.getDate() - 14);
    this.myTicketsService.getAllTickets(start, end, this.type).pipe(take(1)).subscribe(
      (data) => {
        globalArray[0] = ['N° TICKET', 'TIPO DE TICKET', 'ESTADO', 'TIEMPOS DE CREACIÓN', 'FECHA DE CREACIÓN', 'SOLICITANTE'];

        for (let i = 0; i < data.length; i++) {
          let array = new Array(this.excelColumns.length);

          Object.entries(data[i]).map(([key, value]) => {
            const index = this.excelColumns.indexOf(key);
            if (index !== -1) {
              array[index] = this.setFormatText(key, value);
            }
          });

          globalArray.push(array);
        }

        this.exportService.export(globalArray, 'tickets');
      }
    );
  }

  setFormatText(key, value) {
    switch (key) {
      case 'requestDate':
        let date = new Date(value);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      default:
        return value;
    }
  }


  ngAfterViewInit() {
    console.log('ngAfterViewInit')
    this.dataSource = new MatTableDataSource();
    this.route.url.pipe(take(1)).subscribe((s: UrlSegment[]) => {
      if ((s.length > 0) && s[0].path === 'exec') {
        this.type = 'exec';
      }
    });
    merge(this.paginator.page, this.filterChanged)
      .pipe(
        startWith({}),
        switchMap(() => {
          const date = new Date();
          const end = +date;
          const start = +date.setDate(date.getDate() - 14);
          console.log(this.myTicketsService.getMyTicketsByDate(start, end, this.type, this.paginator.pageIndex + 1, this.size, this.filterString))
          return this.myTicketsService.getMyTicketsByDate(start, end, this.type, this.paginator.pageIndex + 1, this.size, this.filterString)
            .pipe(catchError(() => of(null)));
        }),
        map(data => {

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.count;
          return data.tickets;
        })
      ).subscribe(data => this.dataSource.data = data);
  }
}
