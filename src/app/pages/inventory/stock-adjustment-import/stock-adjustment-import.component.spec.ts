import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAdjustmentImportComponent } from './stock-adjustment-import.component';

describe('StockAdjustmentImportComponent', () => {
  let component: StockAdjustmentImportComponent;
  let fixture: ComponentFixture<StockAdjustmentImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockAdjustmentImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockAdjustmentImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
