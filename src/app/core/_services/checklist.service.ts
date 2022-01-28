import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CheckList, DATAREPORT,REPORT, TicketSecurity } from "../model/advisor-tra";

@Injectable({
    providedIn: 'root'
})
export class ChecklistService {
    public API_URL: string = `${environment.API_URL}`;
    
    constructor(
        private _http: HttpClient
    ) { }

    getDataSecurityTeam(idTeam: number): Observable<any> {
        return this._http.get<CheckList[]>(`${this.API_URL}/SecurityCheckList/ServiceTeam/${idTeam}`).pipe(
            map((scl: CheckList[]) => {
                return scl;
        }));  
    }

    getDataSecurityTeam2(idTeam: number): Observable<CheckList[]> {
        return this._http.get<CheckList[]>(`${this.API_URL}/SecurityCheckList/ServiceTeam/${idTeam}`);  
    }

    putDataSecurityTeam(List: TicketSecurity[]): Observable<any> {
        return this._http.post<any>(`${this.API_URL}/SecurityCheckList`,List);        
    }

    getCheckList(idTicket: number): Observable<DATAREPORT[]>{
        return idTicket? this._http.get<DATAREPORT[]>(`${this.API_URL}/SecurityCheckList/Report/${idTicket}`):this._http.get<DATAREPORT[]>(`${this.API_URL}/SecurityCheckList/Report/${0}`);
    }

    
}