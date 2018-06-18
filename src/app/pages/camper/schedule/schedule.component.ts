import { Component, OnInit } from '@angular/core';
import { ScheduleService } from "../../../service/schedule.service";
import { interval } from "rxjs"

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

    header: any;
    dataSource: any;
    displayedColumns = ['day', 'time', 'event', 'info'];
    entries: any;

    private campDays = [0, 20, 21, 22]; // 1 based index

  constructor(
    public schService:ScheduleService
  ) { }

  ngOnInit() {
    this.schService.getSheet().subscribe(response => {

      this.entries = this.processResponse(response.values);
      this.dataSource = this.entries;
      this.startCountdown();
      
  })
  }

  processResponse(response) {
    console.log(response);
    const latestEntries = this.filterLatestEntries(response);
    const sortedEntries = this.sortEntries(latestEntries);
    console.log(sortedEntries);
    return sortedEntries
  }

  filterLatestEntries(response) {
    this.header = response[0];
    const idIndex = this.getIdIndex(this.header);
    const latestEntries = []
    for (let i = 1; i < response.length; i++) {
      if (latestEntries[response[i][idIndex]] == null) {
        latestEntries[response[i][idIndex]] = this.newEntry(this.header, response[i]);
      }
    }
    latestEntries.shift();
    return latestEntries;
  }

  newEmptyEntry(response) {
    return newEntry(this.header, ["To be updated", 3, 2359, 2359, "", 0]);
  }

  newEntry(header, response) {
    const entry = {}
    for (let i = 0; i < header.length; i++) {
      entry[header[i]] = response[i];
    }
    return entry;
  }

  sortEntries(entries) {
    entries.sort((a, b) => {
      if (+a.day < +b.day ||
        +a.day === +b.day && +a['start time'] < +b['start time']) {
        return -1;
      } 
      return 1;
    })
    return entries;
  }

  startCountdown() {
    const latestEntry = this.entries[0];
    let countdownTo = this.newCampDate(latestEntry.day, latestEntry['start time']);
    this.reminderNotes = latestEntry.info;

    interval(1000).subscribe(n => {
      var currentTime = new Date();
      if(Math.round((countdownTo.getTime() - currentTime.getTime())/1000) <= 0){
        eventsArr = this.getNextEvent();
        countdownTo = eventsArr[0].date;
      }

      var countdowntimer = Math.round((countdownTo.getTime() - currentTime.getTime())/1000);
      this.hours = Math.floor(countdowntimer/3600);
      this.mins = Math.floor((countdowntimer % 3600)/60);
      this.secs = Math.floor((countdowntimer % 60));
    });
  }

  getIdIndex(header) {
    for (let i = 0; i < header.length; i++) {
      if (header[i] === "id") {
        return i;
      }
    }
    return 0;
  }


  getEventInDateandReminderFormat(eventForTheDay){

    var tempArr = [];

    for(var i=0; i<eventForTheDay.length; i++){
      var event = eventForTheDay[i];

      var days = (event[1] == 1) ? 20 : (event[1] == 2) ? 21 : 23;
      var hours = event[2].substring(0, 2);
      var mins = event[2].substring(2, 4);
      tempArr.push(this.newEntry(new Date(2018, 6,  days, hours, mins), event[4])); //year, month, day, hr, mins
    }

    return tempArr;
  }

  newCampDate(day, time) {
    const campDay = this.campDays[+day];
    const hour = time.substring(0, 2);
    const minute = time.substring(2, 4);
    return new Date(2018, 6,  campDay, hour, minute);
  }

  getNextEvent(){
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

  getNextEvent() {
    this.entries.shift();
    if (this.entries.length === 0) {
      this.entries.push(newEmptyEntry());
    }
    this.dataSource = this.entries;
    return this.entries[0];

  }

}
