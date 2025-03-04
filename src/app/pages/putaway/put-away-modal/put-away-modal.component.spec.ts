import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutAwayModalComponent } from './put-away-modal.component';

describe('PutAwayModalComponent', () => {
  let component: PutAwayModalComponent;
  let fixture: ComponentFixture<PutAwayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutAwayModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutAwayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
