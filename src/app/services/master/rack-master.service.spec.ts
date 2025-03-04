import { TestBed } from '@angular/core/testing';

import { RackMasterService } from './rack-master.service';

describe('RackMasterService', () => {
  let service: RackMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RackMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
