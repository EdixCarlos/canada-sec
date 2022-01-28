import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceMaintainer, ServicePvt, ServiceUpdate} from '../model/maintainers';
import { projectFases } from '../model/projectFases';
import { Service } from '../model/service';

let parameters = [

]

@Injectable({
  providedIn: 'root'
})




export class ServicesService {

  private _selectedService: BehaviorSubject<Service> = new BehaviorSubject(null);
  public selectedService$ = this._selectedService.asObservable();

  API_URL: string = `${environment.API_URL}`;

  constructor(private _http: HttpClient) { }

  setService(service: Service){
    this._selectedService.next(service)
  }

  getFases(): Observable<projectFases[]> {
    return this._http.get<projectFases[]>(`${this.API_URL}/Service`);
  }

  getServiceMaintainers(): Observable<ServicePvt[]> {
    return this._http.get<ServicePvt[]>(`${this.API_URL}/Service`);   
  }

  getDataServices(collector: any): Observable<ServiceMaintainer[]>{
    return this._http.get<ServiceMaintainer[]>(`${this.API_URL}/MaintainerService/${collector.idservice}/${collector.type}/${collector.parent}`);
  }

  createDataService(child: ServiceMaintainer){
    return this._http.post<any>(`${this.API_URL}/MaintainerService`,child);
  }

  updateDataService(child: ServiceUpdate){
    return this._http.patch<any>(`${this.API_URL}/MaintainerService/${child.id}`,child);
  }

  deleteDataService(id: number){
    return this._http.delete<any>(`${this.API_URL}/MaintainerService/${id}`);
  }

}
