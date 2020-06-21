import { TestBed } from '@angular/core/testing';

import { FirebaseApikeyManagerService } from './firebase-apikey-manager.service';

describe('FirebaseApikeyManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseApikeyManagerService = TestBed.get(FirebaseApikeyManagerService);
    expect(service).toBeTruthy();
  });
});
