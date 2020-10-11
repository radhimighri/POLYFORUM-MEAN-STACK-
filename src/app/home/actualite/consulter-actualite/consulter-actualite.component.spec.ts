import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterActualiteComponent } from './consulter-actualite.component';

describe('ConsulterActualiteComponent', () => {
  let component: ConsulterActualiteComponent;
  let fixture: ComponentFixture<ConsulterActualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterActualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
