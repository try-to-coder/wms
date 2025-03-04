import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseMasterDetailComponent } from './warehouse-master-detail.component';

describe('WarehouseMasterDetailComponent', () => {
  let component: WarehouseMasterDetailComponent;
  let fixture: ComponentFixture<WarehouseMasterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseMasterDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
