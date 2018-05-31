import { TestBed, inject } from '@angular/core/testing';

import { GoogleOAuthService } from './google-o-auth.service';

describe('GoogleOAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleOAuthService]
    });
  });

  it('should be created', inject([GoogleOAuthService], (service: GoogleOAuthService) => {
    expect(service).toBeTruthy();
  }));
});
