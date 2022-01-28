import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Advisor } from '../model/avisor.modal';

@Injectable({
  providedIn: 'root'
})

export class ExecutorService {
  API_URL: string = `${environment.API_URL}`;

  constructor(private _http: HttpClient) { }

  getAvisors(idServicio: number): Observable<Advisor[]> {
    return this._http.get<Advisor[]>(`${this.API_URL}/Executor/ByService/${idServicio}`);
  }

  getExecutorById(id: number): Observable<Advisor> {
    return this._http.get<Advisor>(`${this.API_URL}/Executor/${id}`);
  }
}
