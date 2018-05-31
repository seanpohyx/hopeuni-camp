import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsAdminComponent } from './announcements-admin.component';

describe('AnnouncementsAdminComponent', () => {
  let component: AnnouncementsAdminComponent;
  let fixture: ComponentFixture<AnnouncementsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
