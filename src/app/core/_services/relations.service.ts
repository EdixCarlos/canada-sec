import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RelationPvt, RelationsMaintainer, RequesterMaintainer} from '../model/maintainers';

@Injectable({
  providedIn: 'root'
})


export class RelationsService {
  API_URL: string = `${environment.API_URL}`;

  constructor(private _http: HttpClient) { }

  getHeadersEPM(type: number, idParent: number): Observable<RelationPvt[]> {
    return this._http.get<RelationPvt[]>(`${this.API_URL}/Maintainer/${type}/${idParent}`);
  }

  createDataGeneral(maintainer: RelationsMaintainer){
    console.log('service', maintainer);
    return this._http.post<any>(`${this.API_URL}/Maintainer`,maintainer);
  }
 
  updateDataService(child: any): Observable<any[]>{
    return this._http.patch<any>(`${this.API_URL}/MaintainerService/${child.id}`,child);
  }

  /*
  deleteDataService(id: Number){//J 
    return this._http.delete<any>(`${this.API_URL}/MaintainerService/${id}`);
  }*/

  /**/
  getRequesters(): Observable<RequesterMaintainer[]> {
    return this._http.get<RequesterMaintainer[]>(`${this.API_URL}/Requester`);
  }

  createRequester(requester: RequesterMaintainer){    
    return this._http.post<any>(`${this.API_URL}/Requester`,requester);
  }
 
  updateRequester(id: number, requester: any): Observable<any[]>{ 
    return this._http.patch<any>(`${this.API_URL}/Requester/${id}`,requester);
  }
  
  deleteRequester(id: Number){
    return this._http.delete<any>(`${this.API_URL}/Requester/${id}`);
  }
}
