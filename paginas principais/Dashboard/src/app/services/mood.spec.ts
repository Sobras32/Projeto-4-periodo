import { TestBed } from '@angular/core/testing';

import { Mood } from './mood.service';

describe('Mood', () => {
  let service: Mood;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mood);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
