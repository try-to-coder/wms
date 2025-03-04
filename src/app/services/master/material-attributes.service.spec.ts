import { TestBed } from '@angular/core/testing';

import { MaterialAttributesService } from './material-attributes.service';

describe('MaterialAttributesService', () => {
  let service: MaterialAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
