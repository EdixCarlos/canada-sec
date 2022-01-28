import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ModuleAppUpdate,
       ModuleAppMaintainer, 
       ModuleAppPvt,ModuleAppTmp, appMaintainer, RelationPvt} from '../model/maintainers';

@Injectable({
  providedIn: 'root'
})


export class ModuleappService {
  API_URL: string = `${environment.API_URL}`;

  constructor(private _http: HttpClient) { }
  
  getSParametersMaintainers(idParameterTable: number): Observable<ModuleAppPvt[]> { 
    return this._http.get<ModuleAppPvt[]>(`${this.API_URL}/Parameter/${idParameterTable}`);   
  }

  getDataMaintainer(type: number): Observable<ModuleAppTmp[]>{
    return this._http.get<ModuleAppTmp[]>(`${this.API_URL}/Maintainer/${type}`);
  }

  getHeadersEPM(type: number, idParent: number): Observable<RelationPvt[]> {
    return this._http.get<RelationPvt[]>(`${this.API_URL}/Maintainer/${type}/${idParent}`);
  }
  
  getChilds(idRegion: number, idCountry: number,idEntity: number,idBusinessUnit: number): Observable<ModuleAppMaintainer[]> {
    return this._http.get<ModuleAppMaintainer[]>(`${this.API_URL}/Application/filter/${idRegion}/${idCountry}/${idEntity}/${idBusinessUnit}`);
  }
  
  getDetails(empCode): Observable<ModuleAppMaintainer[]>{
    return this._http.get<ModuleAppMaintainer[]>(`${this.API_URL}/Application/empcode/${empCode}`);
  }

  createDataService(child: ModuleAppUpdate){
    return this._http.post<any>(`${this.API_URL}/Application/`,child);
  }

  updateDataApplication(application: ModuleAppUpdate){
    return this._http.patch<any>(`${this.API_URL}/Application/${application.id}`,application);
  }

  deleteDataService(id: Number){
    return this._http.delete<any>(`${this.API_URL}/Application/${id}`);
  }
  
}
