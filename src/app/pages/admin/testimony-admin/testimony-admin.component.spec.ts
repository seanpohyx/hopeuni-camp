import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonyAdminComponent } from './testimony-admin.component';

describe('TestimonyAdminComponent', () => {
  let component: TestimonyAdminComponent;
  let fixture: ComponentFixture<TestimonyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
