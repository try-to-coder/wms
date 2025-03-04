import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickListModalComponent } from './pick-list-modal.component';

describe('PickListModalComponent', () => {
  let component: PickListModalComponent;
  let fixture: ComponentFixture<PickListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
