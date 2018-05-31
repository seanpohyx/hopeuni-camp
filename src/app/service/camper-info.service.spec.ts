import { TestBed, inject } from '@angular/core/testing';

import { CamperInfoService } from './camper-info.service';

describe('CamperInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CamperInfoService]
    });
  });

  it('should be created', inject([CamperInfoService], (service: CamperInfoService) => {
    expect(service).toBeTruthy();
  }));
});
