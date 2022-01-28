import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UDF_CONTROL_TYPES, UDF_VALIDATION_TYPES } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';
import { Udf } from '../model/udf';

@Injectable({
  providedIn: 'root'
})
export class UdfService {

  private _formSent = new BehaviorSubject<boolean>(false);
  private udfControlTypes = UDF_CONTROL_TYPES;
  private udfValidationTypes = UDF_VALIDATION_TYPES;

  constructor(private _http: HttpClient) { }

  get formSent() {
    return this._formSent.asObservable();
  }

  setFormSent(value: boolean) {
    this._formSent.next(value);
  }

  getUdf(formName: string): Observable<Udf[]> {
    
    return new Observable<Udf[]>();
    // return this._http.get<Udf[]>(`${environment.API_URL}/udf/${formName}`);
  }
}
