import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProfComponent } from './modifier-prof.component';

describe('ModifierProfComponent', () => {
  let component: ModifierProfComponent;
  let fixture: ComponentFixture<ModifierProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
