import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProCreateComponent } from './pro-create.component';

describe('ProCreateComponent', () => {
  let component: ProCreateComponent;
  let fixture: ComponentFixture<ProCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
