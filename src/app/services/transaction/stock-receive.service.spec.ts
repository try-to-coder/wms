import { TestBed } from '@angular/core/testing';

import { StockReceiveService } from './stock-receive.service';

describe('StockReceiveService', () => {
  let service: StockReceiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockReceiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
