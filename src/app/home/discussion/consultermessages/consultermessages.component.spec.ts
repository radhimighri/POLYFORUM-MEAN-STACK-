import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultermessagesComponent } from './consultermessages.component';

describe('ConsultermessagesComponent', () => {
  let component: ConsultermessagesComponent;
  let fixture: ComponentFixture<ConsultermessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultermessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultermessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
