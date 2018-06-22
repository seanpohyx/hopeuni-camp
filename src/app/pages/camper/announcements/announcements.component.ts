import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from "../../../service/announcements.service";
import { AnnouncementEntry } from "../../../model/AnnouncementEntry.model";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  
  announcementlist: AnnouncementEntry[];
  displayLoader: boolean;
  
  constructor(
    public annoService:AnnouncementsService
  ) {}

  ngOnInit() {

    this.displayLoader = true;
    this.annoService.getLatestEntries(5).subscribe(response => {
      this.announcementlist = response;
      this.displayLoader = false; 
    })
  }


}