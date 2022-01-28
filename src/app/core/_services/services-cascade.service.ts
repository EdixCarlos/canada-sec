import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REQUEST_TYPES, SERVICES, SUB_SERVICES } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';
import { RequestType } from '../model/request-type';
import { Service } from '../model/service';
import { SubService } from '../model/sub-service';

@Injectable({
  providedIn: 'root'
})
export class ServicesCascadeService {

  constructor(private _http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this._http.get<any>(`${environment.API_URL}/Service`);
  }

  getSubServicesByServiceId(id): Observable<SubService[]> {
    return this._http.get<any>(`${environment.API_URL}/TicketType/${id}`);
  }

  getRequestTypeByServiceId(serivceId, id): Observable<RequestType[]> {
    return this._http.get<any>(`${environment.API_URL}/TicketType/${id}/${serivceId}`);
  }
}
