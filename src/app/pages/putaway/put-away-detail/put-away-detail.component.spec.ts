import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutAwayDetailComponent } from './put-away-detail.component';

describe('PutAwayDetailComponent', () => {
  let component: PutAwayDetailComponent;
  let fixture: ComponentFixture<PutAwayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutAwayDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutAwayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
