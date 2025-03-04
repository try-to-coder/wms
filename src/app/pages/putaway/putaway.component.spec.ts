import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutawayComponent } from './putaway.component';

describe('PutawayComponent', () => {
  let component: PutawayComponent;
  let fixture: ComponentFixture<PutawayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutawayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutawayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
