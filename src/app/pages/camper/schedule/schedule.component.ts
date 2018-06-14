import { Component, OnInit } from '@angular/core';
import { ScheduleService } from "../../../service/schedule.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
	
  	private todayDate;
  	private schedulelist;

  constructor(
  	public schService:ScheduleService
  	) { }

  ngOnInit() {
  	this.schService.getSheet().subscribe(response => {

	  	var date = ["20 JULY", "21 JULY", "22 JULY"];

	  	var scheduleArr = response.values; 
	  	var schedulelist = [];
	  	this.schedulelist = this.getSchedule(scheduleArr);
	  	this.todayDate = date[this.schedulelist[0][1]] + " 2018";
	  	console.log(scheduleArr);
 		

	})
  }

  getSchedule(schedule){
	  var arrlist = [];
	  var date = 1;//enter date

	  for(var i=0; i < schedule.length; i++){
		  if(schedule[i][1] == date){

		  	arrlist.push(schedule[i]);
		  }
	  }
	  return arrlist;
  }

}
