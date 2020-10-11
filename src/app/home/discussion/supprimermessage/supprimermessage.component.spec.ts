import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimermessageComponent } from './supprimermessage.component';

describe('SupprimermessageComponent', () => {
  let component: SupprimermessageComponent;
  let fixture: ComponentFixture<SupprimermessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimermessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
