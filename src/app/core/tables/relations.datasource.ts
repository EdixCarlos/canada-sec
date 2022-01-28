import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, first, take } from "rxjs/operators";
import { ServicesService } from "../_services/services.service";
import { RelationPvt, RelationsMaintainer } from "../model/maintainers"
import { RelationsService } from "../_services/relations.service";


export class RelationsDataSource implements DataSource<any>{
    
    private maintainersSubject = new BehaviorSubject<RelationsMaintainer[]>([]);
    //private FieldMaintainersSubject = new BehaviorSubject<ServiceMaintainer[]>([]);
    
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private updateSubject = new BehaviorSubject<boolean>(false); 

    
    constructor(private mntService: RelationsService) {        
    }

    connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
        return this.maintainersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.maintainersSubject.complete();
        this.loadingSubject.complete();
    }
    
    loadHeaders(): Observable<RelationsMaintainer[]>{
        const type = 1;
        const idParent = 0;
        this.loadingSubject.next(true);
        return this.mntService.getHeadersEPM(type, idParent)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)),
            take(1)
        );
    }

    loadFilters(type:number, idParent: number): Observable<RelationsMaintainer[]>{
        this.loadingSubject.next(true);
        return this.mntService.getHeadersEPM(type, idParent)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)),
            take(1)
        );
    }

    
    CreateMaintainer(maintainer: RelationsMaintainer){
        this.loadingSubject.next(true);
        return this.mntService.createDataGeneral(maintainer)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.updateSubject.next(false)),
            take(1)
        );
    }
    
    updateServiceDataManteiner(maintainer: RelationsMaintainer) {
        this.loadingSubject.next(true);    
        return this.mntService.updateDataService(maintainer)
        .pipe(
         catchError(() => of([])),
         finalize(() => this.updateSubject.next(false)),
         take(1)
         );
    }

          
    deleteRequester(id: number){
        //console.log('delete');
        return this.mntService.deleteRequester(id).
        pipe(
         catchError(() => of([])),
         finalize(() => this.updateSubject.next(false)),
         take(1)
         );
    }
}