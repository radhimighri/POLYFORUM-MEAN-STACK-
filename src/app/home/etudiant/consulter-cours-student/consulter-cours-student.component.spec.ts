import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterCoursStudentComponent } from './consulter-cours-student.component';

describe('ConsulterCoursStudentComponent', () => {
  let component: ConsulterCoursStudentComponent;
  let fixture: ComponentFixture<ConsulterCoursStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterCoursStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterCoursStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
