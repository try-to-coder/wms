import { TestBed } from '@angular/core/testing';

import { DataSanitizerService } from './data-sanitizer.service';

describe('DataSanitizerService', () => {
  let service: DataSanitizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSanitizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
