import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSignOnRoadmapComponent } from './single-sign-on-roadmap.component';

describe('SingleSignOnRoadmapComponent', () => {
  let component: SingleSignOnRoadmapComponent;
  let fixture: ComponentFixture<SingleSignOnRoadmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSignOnRoadmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSignOnRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
