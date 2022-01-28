import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { MyTicketsService } from "../_services/my-tickets.service";

export class MyTicketsDataSource implements DataSource<any>{
    private myTicketsSubject = new BehaviorSubject<any[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private myTicketsService: MyTicketsService) {

    }

    connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
        return this.myTicketsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.myTicketsSubject.complete();
        this.loadingSubject.complete();
    }
    
    loadMyTickets() {
        this.loadingSubject.next(true);
        this.myTicketsService.getMyTickets()
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(data => {
            this.myTicketsSubject.next(data);
        });
    }
}