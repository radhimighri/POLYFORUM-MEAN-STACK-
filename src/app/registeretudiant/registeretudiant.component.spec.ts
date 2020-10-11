import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteretudiantComponent } from './registeretudiant.component';

describe('RegisteretudiantComponent', () => {
  let component: RegisteretudiantComponent;
  let fixture: ComponentFixture<RegisteretudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteretudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteretudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
