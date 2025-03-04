import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutAwayGenerationComponent } from './put-away-generation.component';

describe('PutAwayGenerationComponent', () => {
  let component: PutAwayGenerationComponent;
  let fixture: ComponentFixture<PutAwayGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutAwayGenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutAwayGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
