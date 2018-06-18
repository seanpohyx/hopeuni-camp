import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from "../../../service/announcements.service";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  data:any;

  constructor(
    public annoService:AnnouncementsService
  ) { }

  ngOnInit() {
    this.annoService.getSheet().subscribe(response => {
      this.data = JSON.stringify(response.values, null, 2);
    })
  }

}
