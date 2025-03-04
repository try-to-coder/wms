import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOrderImportComponent } from './pick-order-import.component';

describe('PickOrderImportComponent', () => {
  let component: PickOrderImportComponent;
  let fixture: ComponentFixture<PickOrderImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickOrderImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickOrderImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
