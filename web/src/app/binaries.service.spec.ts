import { TestBed } from '@angular/core/testing';

import { BinariesService } from './binaries.service';

describe('BinariesService', () => {
  let service: BinariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
