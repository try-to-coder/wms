import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialAttributesComponent } from './material-attributes.component';

describe('MaterialAttributesComponent', () => {
  let component: MaterialAttributesComponent;
  let fixture: ComponentFixture<MaterialAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
