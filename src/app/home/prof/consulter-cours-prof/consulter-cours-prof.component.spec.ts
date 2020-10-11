import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterCoursProfComponent } from './consulter-cours-prof.component';

describe('ConsulterCoursProfComponent', () => {
  let component: ConsulterCoursProfComponent;
  let fixture: ComponentFixture<ConsulterCoursProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterCoursProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterCoursProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
