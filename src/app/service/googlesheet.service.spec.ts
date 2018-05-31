import { TestBed, inject } from '@angular/core/testing';

import { GooglesheetService } from './googlesheet.service';

describe('GooglesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglesheetService]
    });
  });

  it('should be created', inject([GooglesheetService], (service: GooglesheetService) => {
    expect(service).toBeTruthy();
  }));
});
