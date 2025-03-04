import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoOutwardScanComponent } from './cargo-outward-scan.component';

describe('CargoOutwardScanComponent', () => {
  let component: CargoOutwardScanComponent;
  let fixture: ComponentFixture<CargoOutwardScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoOutwardScanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargoOutwardScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
