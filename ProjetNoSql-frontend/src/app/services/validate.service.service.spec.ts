import { TestBed } from '@angular/core/testing';

import { Validate.ServiceService } from './validate.service.service';

describe('Validate.ServiceService', () => {
  let service: Validate.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Validate.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
