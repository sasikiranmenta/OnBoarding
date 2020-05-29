import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradComponent } from './grad.component';

describe('GradComponent', () => {
  let component: GradComponent;
  let fixture: ComponentFixture<GradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
