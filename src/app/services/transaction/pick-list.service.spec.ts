import { TestBed } from '@angular/core/testing';

import { PickListService } from './pick-list.service';

describe('PickListService', () => {
  let service: PickListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
