import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterradminsComponent } from './consulterradmins.component';

describe('ConsulterradminsComponent', () => {
  let component: ConsulterradminsComponent;
  let fixture: ComponentFixture<ConsulterradminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterradminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterradminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
