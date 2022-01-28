import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { SpsUser } from 'src/app/modules/auth/_models/sps-user.model';
import { AuthenticationService } from 'src/app/modules/auth/_services/authentication.service';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  user$: Observable<SpsUser>;

  constructor(private layout: LayoutService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    this.user$ = this.auth.currentUserValueObs;
  }

  logout() {
    //this.auth.logout();
    document.location.reload();
  }
}
