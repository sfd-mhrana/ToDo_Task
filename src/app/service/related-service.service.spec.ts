import { TestBed } from '@angular/core/testing';

import { RelatedServiceService } from './related-service.service';

describe('RelatedServiceService', () => {
  let service: RelatedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
