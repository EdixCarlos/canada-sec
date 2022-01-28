import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, first, take } from "rxjs/operators";
import { MaintainersService } from "../_services/maintainers.service";
import  {DataPvt, DataMaintainer, Parameter, GeneralPvt} from "../model/maintainers"

export class MaintainersDataSource implements DataSource<any>{
    
    private maintainersSubject = new BehaviorSubject<DataPvt[]>([]);

    private DataMaintainersSubject = new BehaviorSubject<DataMaintainer[]>([]);
    private UniqueMaintainersSubject = new BehaviorSubject<DataPvt[]>([]);
    private DataParametersSubject = new BehaviorSubject<Parameter[]>([]);
    private CreateMaintainersSubject = new BehaviorSubject<DataMaintainer[]>([]);
    
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private updateSubject = new BehaviorSubject<boolean>(false); 

    public loading$ = this.loadingSubject.asObservable();    
    public maintainer$ = this.maintainersSubject.asObservable();
    public datageneral$ = this.DataMaintainersSubject.asObservable();
    public uniquegeneral$ = this.UniqueMaintainersSubject.asObservable();
    public paremetergeneral$ = this.DataParametersSubject.asObservable();
    public creationgeneral$ = this.CreateMaintainersSubject.asObservable();

    constructor(private mntService: MaintainersService) {
        
    }

    connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
        return this.maintainersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.maintainersSubject.complete();
        this.loadingSubject.complete();
    }

    loadGeneralMaintainers(): Observable<DataPvt[]> {
        this.loadingSubject.next(true);
        return this.mntService.getGeneralMaintainers()
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)),
            take(1)
        );
    }

    fill(id: string): Observable<any>{
        if(id == "-1") {
           return null;           
        }
        this.loadingSubject.next(true);        
        return this.mntService.getMaintainerById(id);        
    }

    CreateMaintainer(maintainer: DataMaintainer){
        this.loadingSubject.next(true);
        return this.mntService.createDataGeneral(maintainer)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.updateSubject.next(false)),
            take(1)
        );
    }

    updateGeneralDataManteiner(maintainer: GeneralPvt): Observable<any> {  
        return this.mntService.updateDataGeneral(maintainer).pipe(
            catchError(() => of()),
            finalize(() => this.updateSubject.next(false)),
            take(1)
        );
    }

     deleteItem(id: number){
        return this.mntService.deleteDataGeneral(id).
        pipe(
         catchError(() => of([])),
         finalize(() => this.updateSubject.next(false)),
         take(1)
         );
     }
    
}