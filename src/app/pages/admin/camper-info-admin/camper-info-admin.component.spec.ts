import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamperInfoAdminComponent } from './camper-info-admin.component';

describe('CamperInfoAdminComponent', () => {
  let component: CamperInfoAdminComponent;
  let fixture: ComponentFixture<CamperInfoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamperInfoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamperInfoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
