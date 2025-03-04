import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMasterDetailComponent } from './material-master-detail.component';

describe('MaterialMasterDetailComponent', () => {
  let component: MaterialMasterDetailComponent;
  let fixture: ComponentFixture<MaterialMasterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialMasterDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
