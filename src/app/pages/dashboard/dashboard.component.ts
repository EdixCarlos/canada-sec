import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Country, CountryDetail, CountryItem, Extend } from 'src/app/core/model/Dash';
import { DashboardService } from 'src/app/core/_services/dashboad.service';
import { AuthenticationService } from 'src/app/modules/auth';
import { SpsUser } from 'src/app/modules/auth/_models/sps-user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
  _user = {
    name: '',
    type: []
  }

  spsUser: SpsUser;
  type: any
  GeneralReport: Extend[] = [];
  CountryReport: Country[] = [];
  CountryItems: CountryItem[] = [];
  TrendReport: any[] = [];

  $notifier = new Subject();
  $subscription: Subscription;

  showCountryColumn = false;

  constructor(
    private mntrsService: DashboardService,
    private authService: AuthenticationService,
    private _ref: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getUser();
    this.$subscription = this.route.params.pipe(takeUntil(this.$notifier)).subscribe(params => {
      this.cleanData();
      this.loadData(params['id']); // reset and set based on new parameter this time
    });
  }

  ngOnDestroy() {
    this.$notifier.next(true);
    this.$subscription.unsubscribe();
  }

  cleanData() {
    console.log('clean')
    this.showCountryColumn = false;
    this.GeneralReport = [];
    this.TrendReport = [];
    this.CountryReport = [];
  }

  loadData(idService: number) {
    console.log('loading')
    this.generalService(idService);
    this.countryService(idService);
    this.trendService(idService);
  }

  getUser() {
    this.authService.user.pipe(take(1)).subscribe({
      next: (user) => {
        this.spsUser = { ...user };
        this._user.name = user.name;
        // this._user.type = TicketType[user.service];
        // this.type = this._user.type[0].description;
        //this.LoadData();
      },
      error: () => {
        this.spsUser = null
      }
    });
  }

  generalService(type: any) {
    //this.mntrsService.getGeneral(this.type).pipe(take(1)).subscribe(
    this.mntrsService.getGeneral(type).pipe(take(1)).subscribe(
      list => {
        this.GeneralReport = list;
        this._ref.detectChanges();
      });
  }

  countryService(type: any) {
    //this.mntrsService.getCountry(this.type).pipe(take(1)).subscribe(
    this.mntrsService.getCountry(type).pipe(take(1)).subscribe(
      list => {
        this.CountryReport = list;
        list.forEach(
          (country) => {
            if (country.services && country.services.length > 0) {
              country.services.forEach(service => {
                if (service.detail && service.detail.length > 0) {
                  console.log('show country')
                  this.showCountryColumn = true;
                }
              });
            }
          }
        )
        this._ref.detectChanges();
      });
  }

  trendService(type: any) {
    //this.mntrsService.getTrend(this.type).pipe(take(1)).subscribe(
    this.mntrsService.getTrend(type).pipe(take(1)).subscribe(
      list => {
        this.TrendReport = list;
        this._ref.detectChanges();
      });
  }
}
