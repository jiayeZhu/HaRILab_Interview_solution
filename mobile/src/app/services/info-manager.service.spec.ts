import { TestBed } from '@angular/core/testing';

import { InfoManagerService } from './info-manager.service';

describe('InfoManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoManagerService = TestBed.get(InfoManagerService);
    expect(service).toBeTruthy();
  });
});
