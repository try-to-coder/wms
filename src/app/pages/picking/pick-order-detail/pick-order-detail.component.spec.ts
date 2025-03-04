import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOrderDetailComponent } from './pick-order-detail.component';

describe('PickOrderDetailComponent', () => {
  let component: PickOrderDetailComponent;
  let fixture: ComponentFixture<PickOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickOrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
