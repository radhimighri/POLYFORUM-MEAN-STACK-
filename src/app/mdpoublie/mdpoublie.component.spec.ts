import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpoublieComponent } from './mdpoublie.component';

describe('MdpoublieComponent', () => {
  let component: MdpoublieComponent;
  let fixture: ComponentFixture<MdpoublieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdpoublieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdpoublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
