import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDepartementsComponent } from './modifier-departements.component';

describe('ModifierDepartementsComponent', () => {
  let component: ModifierDepartementsComponent;
  let fixture: ComponentFixture<ModifierDepartementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierDepartementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierDepartementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
