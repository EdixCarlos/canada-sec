import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { SlaPvt,SlaMaintainer, Parameter, SlaUpdate } from '../model/maintainers';

@Injectable({
  providedIn: 'root'
})


export class SlaService {
  API_URL: string = `${environment.API_URL}`;

  constructor(private _http: HttpClient) { }
   
  getSlaMaintainers(): Observable<SlaPvt[]>{
    return this._http.get<SlaPvt[]>(`${this.API_URL}/Service`);
  }

  getSlaData(id: number): Observable<SlaMaintainer[]>{
    return this._http.get<SlaMaintainer[]>(`${this.API_URL}/Sla/service/${id}`);
  }

  getDataParameter(idParameterTable: number): Observable<Parameter[]>{
    return this._http.get<Parameter[]>(`${this.API_URL}/Parameter/${idParameterTable}`);        
  }

  deleteDataSla(id: number){    
    return this._http.delete<any>(`${this.API_URL}/Sla/${id}`);
  }

  updateDataSla(maintainer: SlaUpdate){        
    return this._http.patch<any>(`${this.API_URL}/Sla/${maintainer.id}`,maintainer);
  }

  createDataSla(maintainer: SlaMaintainer){
    return this._http.post<any>(`${this.API_URL}/Sla`,maintainer);
  }
}
