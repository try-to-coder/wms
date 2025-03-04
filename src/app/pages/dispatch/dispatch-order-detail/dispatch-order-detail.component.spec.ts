import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchOrderDetailComponent } from './dispatch-order-detail.component';

describe('DispatchOrderDetailComponent', () => {
  let component: DispatchOrderDetailComponent;
  let fixture: ComponentFixture<DispatchOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchOrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
