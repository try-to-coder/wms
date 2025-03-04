import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualInwardScanComponent } from './manual-inward-scan.component';

describe('ManualInwardScanComponent', () => {
  let component: ManualInwardScanComponent;
  let fixture: ComponentFixture<ManualInwardScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualInwardScanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualInwardScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
