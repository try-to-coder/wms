import { TestBed } from '@angular/core/testing';

import { PdfHelperService } from './pdf-helper.service';

describe('PdfHelperService', () => {
  let service: PdfHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
