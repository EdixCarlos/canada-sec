import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestType } from '../model/request-type';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeSelectedService {

  private _selectedRequestType: BehaviorSubject<RequestType> = new BehaviorSubject(null);
  public selectedRequestType$ = this._selectedRequestType.asObservable();

  constructor() { }

  setRequestType(requestType: RequestType){
    this._selectedRequestType.next(requestType)
  }

  get requestType(): RequestType {
    return this._selectedRequestType.getValue();
  }

}
