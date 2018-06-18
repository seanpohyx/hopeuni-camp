import { Component, OnInit } from '@angular/core';
import { ScheduleService } from "../../../service/schedule.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

	data:any;

  constructor(
  	public scheduleService:ScheduleService
  ) { }

  ngOnInit() {
  	this.scheduleService.getSheet().subscribe(response => {
      this.data = JSON.stringify(response.values, null, 2);
    })
  }

}
