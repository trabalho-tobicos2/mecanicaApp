import { TestBed } from '@angular/core/testing';

import { PecaService } from './peca.service';

describe('PecaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PecaService = TestBed.get(PecaService);
    expect(service).toBeTruthy();
  });
});
