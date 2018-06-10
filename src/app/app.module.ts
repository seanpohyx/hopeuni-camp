import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnouncementsComponent } from './pages/camper/announcements/announcements.component';
import { ScheduleComponent } from './pages/camper/schedule/schedule.component';
import { CamperInfoComponent } from './pages/camper/camper-info/camper-info.component';
import { FeedbackComponent } from './pages/camper/feedback/feedback.component';
import { TestimonyComponent } from './pages/camper/testimony/testimony.component';
import { AnnouncementsAdminComponent } from './pages/admin/announcements-admin/announcements-admin.component';
import { ScheduleAdminComponent } from './pages/admin/schedule-admin/schedule-admin.component';
import { CamperInfoAdminComponent } from './pages/admin/camper-info-admin/camper-info-admin.component';
import { FeedbackAdminComponent } from './pages/admin/feedback-admin/feedback-admin.component';
import { TestimonyAdminComponent } from './pages/admin/testimony-admin/testimony-admin.component';
import { HomeComponent } from './pages/camper/home/home.component';
import { HomeAdminComponent } from './pages/admin/home-admin/home-admin.component';
import { LoginAdminComponent } from './pages/admin/login-admin/login-admin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsComponent,
    ScheduleComponent,
    CamperInfoComponent,
    FeedbackComponent,
    TestimonyComponent,
    AnnouncementsAdminComponent,
    ScheduleAdminComponent,
    CamperInfoAdminComponent,
    FeedbackAdminComponent,
    TestimonyAdminComponent,
    HomeComponent,
    HomeAdminComponent,
    LoginAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    // Import HttpClientModule
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
