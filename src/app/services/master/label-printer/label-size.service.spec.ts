import { TestBed } from '@angular/core/testing';

import { LabelSizeService } from './label-size.service';

describe('LabelSizeService', () => {
  let service: LabelSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
