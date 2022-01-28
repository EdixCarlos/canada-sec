import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    public API_URL: string = `${environment.API_URL}/Application`;
    
    constructor(
        private _http: HttpClient
    ) { }

    getApplicationByBusinessUnit(empCode: string): Observable<any> {
        return this._http.get<any>(`${this.API_URL}/filter/0/0/0/${empCode}`);
    }
    
    getApplicationListByCountryId(countryId): Observable<any> {
        return this._http.get<any>(`${this.API_URL}/filter/14`);
    }
}