import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutAwayListComponent } from './put-away-list.component';

describe('PutAwayListComponent', () => {
  let component: PutAwayListComponent;
  let fixture: ComponentFixture<PutAwayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutAwayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutAwayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
