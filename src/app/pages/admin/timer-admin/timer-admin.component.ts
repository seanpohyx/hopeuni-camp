import { Component, OnInit } from '@angular/core';
import { TimerService } from "../../../service/timer.service";
import { TimerEntry } from "../../../model/TimerEntry.model";

@Component({
  selector: 'app-timer-admin',
  templateUrl: './timer-admin.component.html',
  styleUrls: ['./timer-admin.component.scss']
})
export class TimerAdminComponent implements OnInit {

  dataSource = [];
  limit = 1;
  dropdownListDay = [];
  dropdownListHour = [];
  dropdownListMins = [];

  constructor(
  	public timerService:TimerService
  ) { }

  ngOnInit() {
  	this.loadSheet();
  	this.dropdownListDay = [
						    {value: '20', viewValue: 'Day 1'},
						    {value: '21', viewValue: 'Day 2'},
						    {value: '22', viewValue: 'Day 3'}
						];
	this.dropdownListHour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ,17 ,18, 19,20, 21, 22, 23, 24];
	this.dropdownListMins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  }

  loadSheet() {
		this.timerService.getLatestEntries(this.limit).subscribe((entries) => {
			this.dataSource = entries;
		})
	}

	onAdd(mins: any) {
		const nextId = (this.dataSource[0]) ? this.dataSource[0].getId() + 1 : 1;
		var h = new Date();
		var d = new Date(h.getTime() + mins.value*60000);
		
		this.onStartCountDownTo(d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
	}

	onStartCountDownTo(day: any, hour: any, mins: any, secs: any){

		let valueHolder = {
			day: 0,
			hour: 0,
			mins: 0
		};

		valueHolder.day = (day.value === undefined)?day:day.value;
		valueHolder.hour = (hour.value === undefined)?hour:hour.value;
		valueHolder.mins = (mins.value === undefined)?mins:mins.value;

		const nextId = (this.dataSource[0]) ? this.dataSource[0].getId() + 1 : 1;
		const updates = [new TimerEntry(nextId, 6, valueHolder.day, valueHolder.hour, valueHolder.mins, secs, 0)];

		if (this.dataSource.length == this.limit) {
			const lastEntry = this.dataSource[this.limit - 1];
			lastEntry.delete();
			updates.push(lastEntry);
		}

		this.timerService.multiAppendSheet(updates).subscribe(response => {
			this.loadSheet();
		})

	}

}
