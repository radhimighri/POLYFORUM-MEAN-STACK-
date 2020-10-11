import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsConfirmationProfComponent } from './accounts-confirmation-prof.component';

describe('AccountsConfirmationProfComponent', () => {
  let component: AccountsConfirmationProfComponent;
  let fixture: ComponentFixture<AccountsConfirmationProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsConfirmationProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsConfirmationProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
