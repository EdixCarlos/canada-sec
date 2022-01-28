import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, first, map, take } from "rxjs/operators";

import { ChecklistService } from "../_services/checklist.service";
import { CheckList, DATAREPORT, REPORT, TicketSecurity } from "../model/advisor-tra";
import { FormArray } from "@angular/forms";

export class TraDataSource implements DataSource<any>{
    
    private maintainersSubject = new BehaviorSubject<CheckList[]>([]);
      
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private updateSubject = new BehaviorSubject<boolean>(false); 

    public loading$ = this.loadingSubject.asObservable();    
    public maintainer$ = this.maintainersSubject.asObservable();

    constructor(private mntService: ChecklistService) {
        
    }

    connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
        return this.maintainersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.maintainersSubject.complete();
        this.loadingSubject.complete();
    }

    getAllAsFormArray(idTeam: number): Observable<FormArray> {
        return this.mntService.getDataSecurityTeam(idTeam).pipe(map((scl: CheckList[]) => {          
          const _scl = scl.map(CheckList.asFormGroup);
          return new FormArray(_scl);
        }));
    }

    putDataSecurityTeam(List: TicketSecurity[]): Observable<any> {  
        return this.mntService.putDataSecurityTeam(List).pipe(
            catchError(() => of()),
            finalize(() => this.updateSubject.next(false)),
            take(1)
        );
                    
    }

    /*getCheckList(idList: number): Observable<DATAREPORT[]> {
        this.loadingSubject.next(true);
        return this.mntService.getCheckList(idList)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)),
            take(1)
        );
    }*/

}