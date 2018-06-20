import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from "../../../service/announcements.service";
import { AnnouncementEntry } from "../../../model/AnnouncementEntry.model";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  
  private announcementlist;
  
  constructor(
    public annoService:AnnouncementsService
  ) {}

  ngOnInit() {

    this.annoService.getLatestEntries(5).subscribe(response => {
      this.announcementlist = response;
    })
  }


}