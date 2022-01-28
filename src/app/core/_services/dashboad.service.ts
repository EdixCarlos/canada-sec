import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COUNTRY, GENERAL, TREND } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';
import { Country, General, Trend } from '../model/Dash';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  API_URL: string = `${environment.API_URL}/Dashboard`;

  constructor(private _http: HttpClient) { }

  getGeneral(type: any): Observable<any[]> {
    return this._http.get<any[]>(`${this.API_URL}/general/${type}`);    
    // return new Observable(obs => {
    //   obs.next(GENERAL);
    //   obs.complete();
    // });
  }

  getCountry(type: any): Observable<any[]> {
    return this._http.get<any[]>(`${this.API_URL}/countries/${type}`);    
    // return new Observable(obs => {
    //   obs.next(COUNTRY);
    //   obs.complete();
    // });
  }

  getTrend(type: any): Observable<any[]> {
    return this._http.get<any[]>(`${this.API_URL}/trend/${type}`);
    // return new Observable(obs => {
    //   obs.next(TREND);
    //   obs.complete();
    // });
  }

  getQuantities(user: string): Observable<any[]> {
    return this._http.get<any[]>(`${this.API_URL}/quantities/${user}`);
  }

  getStatus(user: string): Observable<any[]> {
    return this._http.get<any[]>(`${this.API_URL}/status/${user}`);
  }

  getExpired(user: string): Observable<any[]> {
    return this._http.get<any[]>(`${this.API_URL}/expired/${user}`);
  }
}
