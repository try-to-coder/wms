import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackMasterDetailComponent } from './rack-master-detail.component';

describe('RackMasterDetailComponent', () => {
  let component: RackMasterDetailComponent;
  let fixture: ComponentFixture<RackMasterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RackMasterDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RackMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
