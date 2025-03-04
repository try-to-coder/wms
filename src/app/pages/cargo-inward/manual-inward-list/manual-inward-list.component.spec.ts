import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualInwardListComponent } from './manual-inward-list.component';

describe('ManualInwardListComponent', () => {
  let component: ManualInwardListComponent;
  let fixture: ComponentFixture<ManualInwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualInwardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualInwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
