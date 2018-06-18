import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from "../../../service/announcements.service";

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

    this.annoService.getSheet().subscribe(response => {
      var annoucementArr = response.values; 

      this.announcementlist = this.getLatest(annoucementArr);

    })
  }

  getLatest(arrList) {
      var temp = [];

      for (var i = arrList.length-1; i >= 0; i-- ){

        if(temp[arrList[i][1]-1] == undefined )
          temp[arrList[i][1]-1] = arrList[i];
      }
      return temp;
  }


}