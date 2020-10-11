import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoyerResComponent } from './envoyer-res.component';

describe('EnvoyerResComponent', () => {
  let component: EnvoyerResComponent;
  let fixture: ComponentFixture<EnvoyerResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoyerResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoyerResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
