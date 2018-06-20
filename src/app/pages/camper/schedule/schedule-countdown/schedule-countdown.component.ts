import { Output, EventEmitter, Component, OnInit } from '@angular/core';
import { ScheduleEntry } from '../../../../model/ScheduleEntry.model';
import { DAY1 } from '../../../../utils/campInfo.util';
import { interval } from "rxjs"

@Component({
  selector: 'app-schedule-countdown',
  templateUrl: './schedule-countdown.component.html',
  styleUrls: ['./schedule-countdown.component.scss']
})
export class ScheduleCountdownComponent implements OnInit {

  @Output() expired = new EventEmitter<ScheduleEntry>();

  isCountingDown = false;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  message: string = "";

  constructor() { }

  ngOnInit() {
  }

  start(schedule?: ScheduleEntry) {
    if (schedule) {
      this.startCountdown(schedule);
    } else {
      this.isCountingDown = false;
    }
  }

  private startCountdown(schedule: ScheduleEntry) {
    const countdownTo = schedule.getStartDate();
    let currentTime, remainingTime;
    this.message = schedule.getInfo();
    const countdown = interval(1000).subscribe(n => {
      this.isCountingDown = true;
      currentTime = new Date();
      if(Math.round((countdownTo.getTime() - currentTime.getTime()) / 1000) <= 0){
        this.expired.emit(schedule);
      }

      let seconds = Math.round((countdownTo.getTime() - currentTime.getTime())/1000);
      this.days = Math.floor(seconds / 86400);
      seconds -= this.days * 86400;
      this.hours = Math.floor(seconds / 3600);
      seconds -= this.hours * 3600;
      this.minutes = Math.floor(seconds / 60);
      seconds -= this.minutes * 60
      this.seconds = seconds;
    });
  }

}
