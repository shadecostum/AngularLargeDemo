import { TestBed } from '@angular/core/testing';

import { LibLoginCredentialService } from './lib-login-credential.service';

describe('LibLoginCredentialService', () => {
  let service: LibLoginCredentialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibLoginCredentialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
