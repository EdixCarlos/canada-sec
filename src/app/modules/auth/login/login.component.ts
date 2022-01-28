import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, RouterStateSnapshot } from '@angular/router';
import { SpsUser } from '../_models/sps-user.model';
import { AuthenticationService } from '../_services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  subs: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private state: RouterStateSnapshot
  ) {
    console.log('login component')
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.submit();
  }

  submit() {
    console.log('submiting login')
    this.subs = this.authService
      .login()
      .pipe(first())
      .subscribe((user: SpsUser) => {
        if (user) {
          this.router.navigate(['/'], { queryParams: { returnUrl: this.state.url }});
        } else {
          console.log('no users');
        }
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
