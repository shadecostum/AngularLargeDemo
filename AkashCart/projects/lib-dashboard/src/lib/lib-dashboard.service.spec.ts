import { TestBed } from '@angular/core/testing';

import { LibDashboardService } from './lib-dashboard.service';

describe('LibDashboardService', () => {
  let service: LibDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
