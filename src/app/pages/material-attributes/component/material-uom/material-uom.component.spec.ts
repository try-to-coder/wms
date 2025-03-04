import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialUomComponent } from './material-uom.component';

describe('MaterialUomComponent', () => {
  let component: MaterialUomComponent;
  let fixture: ComponentFixture<MaterialUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialUomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
