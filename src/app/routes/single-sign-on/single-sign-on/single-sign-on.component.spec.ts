import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSignOnComponent } from './single-sign-on.component';

describe('SingleSignOnComponent', () => {
  let component: SingleSignOnComponent;
  let fixture: ComponentFixture<SingleSignOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSignOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSignOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
