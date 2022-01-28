import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  getTestBed,
} from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { Routes, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserModel } from '../_models/user.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../_services/authentication.service';

const fakeAuth = {
  email: 'admin@demo.com',
  password: 'demo',
  roles: [2], // Manager
  accessToken: 'access-token-' + Math.random(),
  refreshToken: 'access-token-' + Math.random(),
  expiresIn: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000),
  pic: './assets/media/users/default.jpg',
};

const fakeRoutes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/logout', component: LogoutComponent },
  { path: 'auth/registration', component: RegistrationComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];

class FakeAuthService {
  registration(user: UserModel): Observable<UserModel> {
    return of(user);
  }
}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let injector;
  let authService: AuthenticationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot(fakeRoutes),
      ],
      providers: [
        {
          provide: AuthenticationService,
          useClass: FakeAuthService,
        },
      ],
      declarations: [RegistrationComponent],
    }).compileComponents();
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
