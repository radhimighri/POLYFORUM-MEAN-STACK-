import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsConfirmationComponent } from './accounts-confirmation.component';

describe('AccountsConfirmationComponent', () => {
  let component: AccountsConfirmationComponent;
  let fixture: ComponentFixture<AccountsConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
