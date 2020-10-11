import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieradminComponent } from './modifieradmin.component';

describe('ModifieradminComponent', () => {
  let component: ModifieradminComponent;
  let fixture: ComponentFixture<ModifieradminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifieradminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifieradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
