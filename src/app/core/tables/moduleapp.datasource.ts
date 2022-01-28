import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, first, take } from "rxjs/operators";
import { ModuleappService } from "../_services/moduleapp.service";
import { ModuleAppMaintainer, ModuleAppPvt, ModuleAppUpdate } from "../model/maintainers"

interface _objSender{
    region: number,
    country: number,
    entity: number,
    b_unit: number
  }
export class ModuleappDataSource implements DataSource<any>{
    
    private maintainersSubject = new BehaviorSubject<ModuleAppUpdate[]>([]);
  
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private updateSubject = new BehaviorSubject<boolean>(false); 



    constructor(private mntService: ModuleappService) {
        
    }

    connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
        return this.maintainersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.maintainersSubject.complete();
        this.loadingSubject.complete();
    }

    loadEPMServices(idParameterTable: number): Observable<ModuleAppPvt[]>{     
        this.loadingSubject.next(true);
        return this.mntService.getSParametersMaintainers(idParameterTable)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)),
            take(1)
        );
    } 

    loadField(type: number){
        if(type == -1) {           
           return;           
        };
        this.loadingSubject.next(true);
        return this.mntService.getDataMaintainer(type)
                .pipe(
                    catchError(() => of([])),
                    finalize(() => this.loadingSubject.next(false)),
                    take(1)
                );
    }

    loadChild(sender: _objSender){                 
        this.loadingSubject.next(true);
        return this.mntService.getChilds(sender.region, sender.country,sender.entity,sender.b_unit)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)),
                take(1)
            );                
    }    

    CreateMaintainer(maintainer: ModuleAppUpdate){
        this.loadingSubject.next(true);
        return this.mntService.createDataService(maintainer)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.updateSubject.next(false)),
            take(1)
        );   
    }
    
    updateServiceDataManteiner(maintainer: ModuleAppUpdate) {
        this.loadingSubject.next(true);
        return this.mntService.updateDataApplication(maintainer)
        .pipe(
         catchError(() => of([])),
         finalize(() => this.updateSubject.next(false)),
         take(1)
         );
    }

    deleteItem(id: number){
        return this.mntService.deleteDataService(id).
        pipe(
         catchError(() => of([])),
         finalize(() => this.updateSubject.next(false)),
         take(1)
         );
    }        
}