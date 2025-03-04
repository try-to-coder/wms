import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxConfigureComponent } from './tax-configure.component';

describe('TaxConfigureComponent', () => {
  let component: TaxConfigureComponent;
  let fixture: ComponentFixture<TaxConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxConfigureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
