import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoInwardComponent } from './cargo-inward.component';

describe('CargoInwardComponent', () => {
  let component: CargoInwardComponent;
  let fixture: ComponentFixture<CargoInwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoInwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargoInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
