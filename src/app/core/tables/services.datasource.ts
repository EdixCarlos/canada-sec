import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, first, take } from "rxjs/operators";
import { ServicesService } from "../_services/services.service";
import { ServiceMaintainer,ServicePvt,Child, ServiceUpdate } from "../model/maintainers"
const collector = {
    parent: null,
    idservice: null,
    type: null
};
export class ServicesDataSource implements DataSource<any>{
    
    private maintainersSubject = new BehaviorSubject<ServicePvt[]>([]);
    private FieldMaintainersSubject = new BehaviorSubject<ServiceMaintainer[]>([]);
   
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private updateSubject = new BehaviorSubject<boolean>(false); 
   
    constructor(private mntService: ServicesService) {
        
    }

    connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
        return this.maintainersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.maintainersSubject.complete();
        this.loadingSubject.complete();
    }
    
    loadGeneralServices(): Observable<ServicePvt[]>{
        this.loadingSubject.next(true);
        return this.mntService.getServiceMaintainers()
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)),
            take(1)
        );
    }
    
    loadData(id: number){
        if(id == -1) {           
           return;           
        }
        this.loadingSubject.next(true);
        collector.parent = 0;
        collector.idservice = id;
        collector.type = 0;
        return this.mntService.getDataServices(collector)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)),
                take(1)
            );
    }

    loadField(parent: number, idService: number){
        if(parent == -1) {
           this.FieldMaintainersSubject.next([]);
           return;           
        }
        collector.parent = parent;
        collector.idservice = idService;
        collector.type = 1;
        this.loadingSubject.next(true);
        return this.mntService.getDataServices(collector)
                .pipe(
                    catchError(() => of([])),
                    finalize(() => this.loadingSubject.next(false)),
                    take(1)
                );
    }
    loadSvr(item: any): Observable<ServiceMaintainer[]>{
        if(item._service == -1 || item._type == -1 || item._field == -1) {
           return;           
        }else{
            this.loadingSubject.next(true);                    
            if(!item._field){
                collector.parent = item._type;
                collector.idservice = item._service;
                collector.type = 1;          
            }else{
                collector.parent = item._field;
                collector.idservice = item._service;
                collector.type = 2;          
            }
            return this.mntService.getDataServices(collector)
                .pipe(
                    catchError(() => of([])),
                    finalize(() => this.loadingSubject.next(false)),
                    take(1)
                );
        }        
        
    }
   
    deleteItem(id: number){
        this.loadingSubject.next(true);
        return this.mntService.deleteDataService(id).
        pipe(
         catchError(() => of([])),
         finalize(() => this.updateSubject.next(false)),
         take(1)
         );
    }
    
    updateServiceDataManteiner(maintainer: ServiceUpdate) {
        this.loadingSubject.next(true);
        return this.mntService.updateDataService(maintainer)
        .pipe(
         catchError(() => of([])),
         finalize(() => this.updateSubject.next(false)),
         take(1)
         );
    }

    CreateMaintainer(maintainer: ServiceMaintainer){
        this.loadingSubject.next(true);
        return this.mntService.createDataService(maintainer)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.updateSubject.next(false)),
            take(1)
        );   
    }
}