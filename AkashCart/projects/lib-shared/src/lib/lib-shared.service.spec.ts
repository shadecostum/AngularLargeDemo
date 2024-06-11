import { TestBed } from '@angular/core/testing';

import { LibSharedService } from './lib-shared.service';

describe('LibSharedService', () => {
  let service: LibSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
