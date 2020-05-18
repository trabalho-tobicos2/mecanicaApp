import { TestBed } from '@angular/core/testing';

import { MecanicoService } from './mecanico.service';

describe('MecanicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MecanicoService = TestBed.get(MecanicoService);
    expect(service).toBeTruthy();
  });
});
