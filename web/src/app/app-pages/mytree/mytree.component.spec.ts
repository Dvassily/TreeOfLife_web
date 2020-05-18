import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytreeComponent } from './mytree.component';

describe('MytreeComponent', () => {
  let component: MytreeComponent;
  let fixture: ComponentFixture<MytreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
