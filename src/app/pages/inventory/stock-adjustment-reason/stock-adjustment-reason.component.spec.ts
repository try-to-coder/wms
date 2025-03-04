import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAdjustmentReasonComponent } from './stock-adjustment-reason.component';

describe('StockAdjustmentReasonComponent', () => {
  let component: StockAdjustmentReasonComponent;
  let fixture: ComponentFixture<StockAdjustmentReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockAdjustmentReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockAdjustmentReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
