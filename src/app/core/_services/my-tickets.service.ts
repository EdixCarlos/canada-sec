import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/auth';
import { environment } from 'src/environments/environment';
import { DbTicket, ObjFile } from '../model/db-ticket.model';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class MyTicketsService {

  constructor(private _http: HttpClient, private authService: AuthenticationService) { }

  getMyTickets(
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3): Observable<Ticket[]> {
    return this._http.get<Ticket[]>(`${environment.API_URL}/Tickets`);
  }

  getMyTicketsByDate(start, end, type, index, size, filterString) {
    let params = new HttpParams();
    params = params.append('start', start);
    params = params.append('end', end);
    params = params.append('page', index);
    params = params.append('rows', size);
    params = params.append('filter', filterString);
    
    if (type === 'exec') {
      return this._http.get<any>(`${environment.API_URL}/Tickets/assignee`, { params });
    } else {
      return this._http.get<any>(`${environment.API_URL}/Tickets`, { params });
    }
  }

  getAllTickets(start, end, type) {
    let params = new HttpParams();
    params = params.append('start', start);
    params = params.append('end', end);

    if (type === 'exec') {
      return this._http.get<any>(`${environment.API_URL}/Tickets/assignee`, { params });
    } else {
      return this._http.get<any>(`${environment.API_URL}/TicketsPdf`, { params });
    }
  }

  updateTicketFile(objFile: ObjFile) {
    return this._http.patch<any>(`${environment.API_URL}/TicketFile/FileData/${objFile.id}`, objFile);
  }

  addTicketFile(objFile: ObjFile) {
    return this._http.post<any>(`${environment.API_URL}/TicketFile`, objFile);
  }

  getTicketDetailById(id) {
    return this._http.get<any>(`${environment.API_URL}/TicketDetail/${id}`);
  }

  getMaintainerById(id: string): Observable<any> {
    return this._http.get<any>(`${environment.API_URL}/Mantenedor/${id}`);
  }

  getServiceMaintainers(): Observable<any[]> {
    return this._http.get<any[]>(`${environment.API_URL}/Mantenedor/services`);
  }

  getSvcMaintainerById(id: string): Observable<any> {
    return this._http.get<any>(`${environment.API_URL}/Mantenedor/services/${id}`);
  }

  getTicketById(id: number): Observable<DbTicket> {
    return this._http.get<DbTicket>(`${environment.API_URL}/Tickets/${id}`);
  }

  saveTicket(ticket: DbTicket): Observable<DbTicket> {
    return this._http.post<DbTicket>(`${environment.API_URL}/Tickets`, ticket);
  }

  updateTicket(idTicket: number, name: string, data: string): Observable<any> {
    return this._http.put<any>(`${environment.API_URL}/Tickets/${idTicket}/changes`, { name, data });
  }

  getTicketsByParentId(idTicket: number) {
    return this._http.get<any>(`${environment.API_URL}/Tickets/ByParent/${idTicket}`);
  }

  updateSpecialActionPlan(id: number, idTicket: number, idExecutor: number, data: string): Observable<any> {
    return this._http.put<any>(`${environment.API_URL}/Tickets/${id}/actionPlanChanges`, { id, idTicket, idExecutor, data });
  }

  getRequesterByService(idService: number): Observable<any> {
    return this._http.get<any>(`${environment.API_URL}/Requester/ByService/${idService}`);
  }
}
