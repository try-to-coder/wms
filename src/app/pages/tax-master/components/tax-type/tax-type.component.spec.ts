import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTypeComponent } from './tax-type.component';

describe('TaxTypeComponent', () => {
  let component: TaxTypeComponent;
  let fixture: ComponentFixture<TaxTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
