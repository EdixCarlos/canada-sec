import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/auth';
import { SpsUser } from 'src/app/modules/auth/_models/sps-user.model';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {

  currentUser$: Observable<SpsUser>;

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    console.log('empty')
    this.currentUser$ = this._authenticationService.user;
  }

  retryLogin() {
    this._authenticationService.resetAttempsCount();
    this._router.navigate(['/']);
  }

}
