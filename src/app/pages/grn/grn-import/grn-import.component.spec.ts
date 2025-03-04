import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnImportComponent } from './grn-import.component';

describe('GrnImportComponent', () => {
  let component: GrnImportComponent;
  let fixture: ComponentFixture<GrnImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
