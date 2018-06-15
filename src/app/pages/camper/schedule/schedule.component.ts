import { Component, OnInit } from '@angular/core';
import { ScheduleService } from "../../../service/schedule.service";
import { interval } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
	
  	private todayDate;
  	private schedulelist;
  	private hours;
  	private mins;
  	private secs;

  constructor(
  	public schService:ScheduleService
  	) { }

  ngOnInit() {
  	this.schService.getSheet().subscribe(response => {

	  	var date = ["20 JULY", "21 JULY", "22 JULY"];

	  	var scheduleArr = response.values; 
	  	this.schedulelist = this.getSchedule(scheduleArr);

		interval(1000).subscribe(n => {
			var eventDate = new Date(2018, 6, 20, 8, 0);
		  	var currentTime = new Date();

		  	var countdowntimer = Math.round((eventDate.getTime() - currentTime.getTime())/1000);
		  	this.hours = Math.floor(countdowntimer/3600);
		  	this.mins = Math.floor((countdowntimer % 3600)/60);
		  	this.secs = Math.floor((countdowntimer % 60));
		  }
		);

	})
  }

  getSchedule(schedule){
	  var arrlist = [];
	  var today = new Date().getDate();
	  var date = (today <= 20) ? 1 : (today <= 21) ? 2 : 3;
	  this.todayDate = (date == 1) ? "20 JULY 2018" : (date == 2) ? "21 JULY 2018" : "23 JULY 2018";

	  for(var i=0; i < schedule.length; i++){
		  if(schedule[i][1] == date && arrlist[schedule[i][5]-1] == undefined){
		  	arrlist[schedule[i][5]-1] = schedule[i];
		  }
		  else if(schedule[i][1] == date && arrlist[schedule[i][5]-1] != undefined){
		  	arrlist[schedule[i][5]-1] = schedule[i];
		  }
	  }

	  var arrcount = arrlist.length; //because as you splice the count will decrease
	  var internalcount = 0; //the i varible is not accurate

	  for(var i=0; i<arrcount;i++){

	  	if(arrlist[internalcount] == undefined){
	  		arrlist.splice(internalcount, 1);
	  	}
	  	else{
	  		internalcount++;
	  	}

	  }

	  return arrlist;
  }

}
