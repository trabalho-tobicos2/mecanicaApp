import { TestBed } from '@angular/core/testing';

import { OrdemService } from './ordem.service';

describe('OrdemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const ordem: OrdemService = TestBed.get(OrdemService);
    expect(ordem).toBeTruthy();
  });
});
