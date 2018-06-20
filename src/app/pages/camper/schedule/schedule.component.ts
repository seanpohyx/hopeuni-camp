import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ScheduleService } from "../../../service/schedule.service";
import { interval } from "rxjs"
import { ScheduleCountdownComponent } from './schedule-countdown/schedule-countdown.component';
import { ScheduleEntry } from '../../../model/ScheduleEntry.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements AfterViewInit {

  private scheduleDisplayDate;
  private schedulelist;
  private hours;
  private mins;
  private secs;
  private reminderNotes;

  header: any;
  dataSource: ScheduleEntry[];
  displayedColumns = ['day', 'time', 'event', 'info'];
  entries: ScheduleEntry[];

  @ViewChild(ScheduleCountdownComponent) countdown;

  constructor(
    public schService:ScheduleService
  ) { }

  ngAfterViewInit() {
    this.schService.getLatestEntries().subscribe(response => {
      this.entries = this.sortEntries(response);
      this.dataSource = this.entries;
      this.onExpired(null);
    })
  }

  onExpired($event) {
    if (this.entries) {
      if ($event == this.entries[0] && this.entries.length > 1) {
        this.entries.shift();
        this.countdown.start(this.entries[0]);
      } else if (this.entries.length > 1) {
        this.countdown.start(this.entries[0]);
      } else {
        this.countdown.start();
      }
    }
  }

  sortEntries(entries: ScheduleEntry[]) {
    entries.sort((a, b) => {
      if (+a.getDay() < +b.getDay() ||
        +a.getDay() === +b.getDay() && +a.getStartTime() < +b.getStartTime()) {
        return -1;
      } 
      return 1;
    })
    return entries;
  }



}
