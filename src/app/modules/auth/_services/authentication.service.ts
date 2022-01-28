import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SpsUser } from '../_models/sps-user.model';
import { MOCK_NULL_USER, MOCK_USER } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<SpsUser>;
  public readonly user: Observable<SpsUser>;
  private userPolicies: any[] = [];
  private _attemptsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private _http: HttpClient) {
    this.userSubject = new BehaviorSubject<SpsUser>(new SpsUser); // local storage ?
    this.user = this.userSubject.asObservable();
  }

  public setUserPolicies(policies) {
    this.userPolicies = policies;
  }

  public getUserPolicies(){
    return this.userPolicies;
  }

  public get attempsCount(): number {
    return this._attemptsCount.value;
  }

  public addAttemptsCount() {
    console.log('next count '+(+this._attemptsCount.value + 1))
    this._attemptsCount.next(+this._attemptsCount.value + 1);
  }

  public resetAttempsCount() { 
    this._attemptsCount.next(0);
  }

  public get currentUserValue(): SpsUser {
    return this.userSubject.value;
  }

  public get currentUserValueObs(): Observable<SpsUser> {
    return this.userSubject.asObservable();
  }

  login(): Observable<SpsUser> {
    console.log('Loging');

    if (environment.isMockEnabled) {
      this.userSubject.next(MOCK_USER);
      return new Observable((obs) => {
        obs.next(MOCK_USER);
        obs.complete();
      });
    } else {
      return this._http.get<SpsUser>(`${environment.apiUrl}/login`)
        .pipe(map(user => {
          // local storage ?
          this.userSubject.next(user);
          return user;
        }));
    }

  }
}
