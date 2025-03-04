import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualInwardImportComponent } from './manual-inward-import.component';

describe('ManualInwardImportComponent', () => {
  let component: ManualInwardImportComponent;
  let fixture: ComponentFixture<ManualInwardImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualInwardImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualInwardImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
