import { TestBed } from '@angular/core/testing';

import { MusicbrainzService } from './musicbrainz.service';

describe('MusicbrainzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicbrainzService = TestBed.get(MusicbrainzService);
    expect(service).toBeTruthy();
  });
});
