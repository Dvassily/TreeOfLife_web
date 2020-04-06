import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinariesComponent } from './binaries.component';

describe('BinariesComponent', () => {
  let component: BinariesComponent;
  let fixture: ComponentFixture<BinariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
