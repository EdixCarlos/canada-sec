import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
  ) {
    console.log('const auth guard')
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.currentUserValue;
    console.log('current user')
    console.log(currentUser)

    if (currentUser.user) {
      if (route.data.roles && !route.data.roles.some((r: string) => currentUser.policies && currentUser.policies.includes(r))) {
        console.log('login false, no roles')
        this._router.navigate(['/empty']);
        return false;
      }
      console.log('login ok')
      return true;
    }
    console.log('login try count')
    console.log(this._authenticationService.attempsCount)
    if (this._authenticationService.attempsCount < 3) {
      this.login(state);
    } else {
      console.log('Too many login tries, login false')
      this._router.navigate(['/empty']);
    }
    return false;
  }

  login(state) {
    this._authenticationService.addAttemptsCount();
    this._authenticationService.login()
      .pipe(first())
      .subscribe(
        data => {
          // if (data.policies)
          //   this.navItems = this.getNavItems(data.policies);

          // else
          //   this.navItems = this.getNavItems([]);
          //if (this._router.url === '/') this._router.navigate(['dashboard']);
          this._router.navigate([state.url]);
        },
        error => {
          console.error(error);
          //this.navItems = this.getNavItems([]);
          this._router.navigate(['/empty']);
        });
  }
}
