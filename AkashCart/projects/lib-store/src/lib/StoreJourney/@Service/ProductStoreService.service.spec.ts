/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductStoreServiceService } from './ProductStoreService.service';

describe('Service: ProductStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductStoreServiceService]
    });
  });

  it('should ...', inject([ProductStoreServiceService], (service: ProductStoreServiceService) => {
    expect(service).toBeTruthy();
  }));
});
