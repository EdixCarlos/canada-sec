import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { UdfService } from "../_services/udf.service";

export class UdfDataSource implements DataSource<any>{
    private udfSubject = new BehaviorSubject<any[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private udfService: UdfService) {

    }

    connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
        return this.udfSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.udfSubject.complete();
        this.loadingSubject.complete();
    }
    
    loadUdf(formName) {
        this.loadingSubject.next(true);
        this.udfService.getUdf(formName)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(data => {
            this.udfSubject.next(data);
        });
    }
}