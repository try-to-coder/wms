import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterFieldComponent } from './date-filter-field.component';

describe('DateFilterFieldComponent', () => {
  let component: DateFilterFieldComponent;
  let fixture: ComponentFixture<DateFilterFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateFilterFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateFilterFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
