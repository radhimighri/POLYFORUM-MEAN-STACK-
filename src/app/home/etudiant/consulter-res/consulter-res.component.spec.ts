import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterResComponent } from './consulter-res.component';

describe('ConsulterResComponent', () => {
  let component: ConsulterResComponent;
  let fixture: ComponentFixture<ConsulterResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
