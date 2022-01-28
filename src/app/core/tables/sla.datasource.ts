import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, first, take } from "rxjs/operators";
import { SlaService } from "../_services/sla.service";
import  { Parameter, SlaMaintainer, SlaPvt, SlaUpdate } from "../model/maintainers"

export class SlaDataSource implements DataSource<any>{
    
    private maintainersSubject = new BehaviorSubject<SlaPvt[]>([]);
    private DataMaintainersSubject = new BehaviorSubject<SlaMaintainer[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    private updateSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();    
    public maintainer$ = this.maintainersSubject.asObservable();
    public paremetersla$ = this.DataMaintainersSubject.asObservable();

    constructor(private mntService: SlaService) {
        
    }

    connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
        return this.maintainersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.maintainersSubject.complete();
        this.loadingSubject.complete();
    }

    loadSlaMaintainers(){
        this.loadingSubject.next(true);
        return this.mntService.getSlaMaintainers()
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)),
            take(1)
        );
    }

    loadData(id: number){
        if(id == -1) {
           this.DataMaintainersSubject.next([]);
           return;           
        }
        this.loadingSubject.next(true);
        return this.mntService.getSlaData(id)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)),
            take(1)
        );
    }

    getParameter(idParameterTable: number): Observable<Parameter[]>{
        this.updateSubject.next(true);
        return this.mntService.getDataParameter(idParameterTable)
        .pipe(
         catchError(() => of([])),
         finalize(() => this.updateSubject.next(false)),
         take(1)
         );
    }

    deleteItem(id: number){
        this.updateSubject.next(true);
        return this.mntService.deleteDataSla(id).
        pipe(
         catchError(() => of([])),
         finalize(() => this.updateSubject.next(false)),
         take(1)
         );
    }
    
    updateSlaDataManteiner(maintainer: SlaUpdate){
        this.updateSubject.next(true);
        return this.mntService.updateDataSla(maintainer)
        .pipe(
         catchError(() => of([])),
         finalize(() => this.updateSubject.next(false)),
         take(1)
         );
    }
    CreateMaintainer(maintainer: SlaMaintainer){
        this.loadingSubject.next(true);
        return this.mntService.createDataSla(maintainer)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.updateSubject.next(false)),
            take(1)
        );
    }
}