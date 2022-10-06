import { TestBed } from '@angular/core/testing';

import { ContatoDataService } from './contato-data.service';

describe('ContatoDataService', () => {
  let service: ContatoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContatoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
