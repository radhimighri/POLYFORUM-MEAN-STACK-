import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterPubComponent } from './consulter-pub.component';

describe('ConsulterPubComponent', () => {
  let component: ConsulterPubComponent;
  let fixture: ComponentFixture<ConsulterPubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterPubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
