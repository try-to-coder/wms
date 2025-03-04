import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMarkSelectComponent } from './all-mark-select.component';

describe('AllMarkSelectComponent', () => {
  let component: AllMarkSelectComponent;
  let fixture: ComponentFixture<AllMarkSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMarkSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMarkSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
