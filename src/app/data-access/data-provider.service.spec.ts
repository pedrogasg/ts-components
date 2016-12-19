/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataProvider } from './data-provider.service';

describe('Service: DataProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataProvider]
    });
  });

  it('should ...', inject([DataProvider], (service: DataProvider) => {
    expect(service).toBeTruthy();
  }));
});
