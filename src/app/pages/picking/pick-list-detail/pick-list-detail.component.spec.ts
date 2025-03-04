import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickListDetailComponent } from './pick-list-detail.component';

describe('PickListDetailComponent', () => {
  let component: PickListDetailComponent;
  let fixture: ComponentFixture<PickListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickListDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
