import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierprofComponent } from './modifierprof.component';

describe('ModifierprofComponent', () => {
  let component: ModifierprofComponent;
  let fixture: ComponentFixture<ModifierprofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierprofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
