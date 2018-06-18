import { Component, OnInit } from '@angular/core';
import { ScheduleService } from "../../../service/schedule.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  	private scheduleDisplayDate;
  	private schedulelist;
  	private hours;
  	private mins;
  	private secs;
  	private reminderNotes;

  constructor(
  	public scheduleService:ScheduleService
  ) { }

  ngOnInit() {
  	this.schService.getSheet().subscribe(response => {

	  	var scheduleArr = response.values; 
	  	this.schedulelist = this.getSchedule(scheduleArr); //get today's schedule
	  	var eventsArr = this.getEventInDateandReminderFormat(this.schedulelist); //getting events in date format for countdown
		var countdown_to = eventsArr[0][0]; //count down to event
		this.reminderNotes = eventsArr[0][1]; //reminder

		interval(1000).subscribe(n =>
		  	var currentTime = new Date();
			if(Math.round((countdown_to.getTime() - currentTime.getTime())/1000) <= 0){
				eventsArr = this.getNextEvent(currentTime, eventsArr);
				countdown_to = eventsArr[0][0];
			}

		  	var countdowntimer = Math.round((countdown_to.getTime() - currentTime.getTime())/1000);
		  	this.hours = Math.floor(countdowntimer/3600);
		  	this.mins = Math.floor((countdowntimer % 3600)/60);
		  	this.secs = Math.floor((countdowntimer % 60));
		);

	})
  }

  getSchedule(schedule){
	  var arrlist = [];
	  var today = new Date().getDay();
	  var date = (today <= 20) ? 1 : (today <= 21) ? 2 : 3; //calulate camp DAY

	  this.scheduleDisplayDate = (date == 1) ? "20 JULY 2018" : (date == 2) ? "21 JULY 2018" : "23 JULY 2018"; //show in HTML 

	  for(var i=0; i < schedule.length; i++){
		  if(schedule[i][1] == date && arrlist[schedule[i][5]-1] === undefined){

		  	if(schedule[i][2].length === 3)
		  		schedule[i][2] = '0'+schedule[i][2];
		  	
		  	if(schedule[i][3].length === 3)
		  		schedule[i][3] = '0'+schedule[i][3];
		  	

		  	arrlist[schedule[i][5]-1] = schedule[i];

		  }
		  else if(schedule[i][1] == date && arrlist[schedule[i][5]-1] !== undefined){

		  	if(schedule[i][2].length === 3)
		  		schedule[i][2] = '0'+schedule[i][2];
		  	
		  	if(schedule[i][3].length === 3)
		  		schedule[i][3] = '0'+schedule[i][3];
		  	
		  	arrlist[schedule[i][5]-1] = schedule[i];
		  	
		  }
	  }

	  var scheduletemp = [];//holder to collect all the schedule

	  for(var i=0; i<arrlist.length;i++){

	  	if(arrlist[i] !== undefined){
	  		scheduletemp.push(arrlist[i]);
	  	}

	  }

	  return scheduletemp;
  }

  getEventInDateandReminderFormat(eventForTheDay){

  	var tempArr = [];

  	for(var i=0; i<eventForTheDay.length; i++){
  		var event = eventForTheDay[i];

	 	var days = (event[1] == 1) ? 20 : (event[1] == 2) ? 21 : 23;
		var hours = event[2].substring(0, 2);
		var mins = event[2].substring(2, 4);
		tempArr.push([new Date(2018, 6,  days, hours, mins), event[4]]); //year, month, day, hr, mins
	}

	return tempArr;

  }

  getNextEvent(currentTime, eventArr){
  	do{
  		eventArr.shift();

  		this.reminderNotes = eventArr[0][1];
  		if(eventArr.length === 0){
  			this.reminderNotes = 'To Be Updated';
  			eventArr.push([new Date(2018, 7,  currentTime.getDay(), 23, 59), 'To Be Updated']); // make sure timer doesn't crash
  		}

	} while (Math.round( (eventArr[0][0].getTime() - currentTime.getTime() ) /1000) <= 0)
	  return eventArr;
  }

}
