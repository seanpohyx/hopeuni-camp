import { IndexedObject } from "./IndexedObject.model";

export class TimerEntry extends IndexedObject {
	private month: number;
	private day: number;
	private hour: number;
	private mins: number;
	private secs: number;

	constructor(id: number, month: number, day: number, hour: number, mins: number, secs: number, deleted?: number) {

		super(id, deleted);
		this.month = month;
		this.day = day;
		this.hour = hour;
		this.mins = mins;
		this.secs = secs;
	}

	static FromSheet(values: any[]): TimerEntry {
		const timerEntry = new TimerEntry(0, parseInt(values[1]), parseInt(values[2]), parseInt(values[3]), parseInt(values[4]), parseInt(values[5]), 1);
		timerEntry.setId(values[0]);
		timerEntry.setDeleted(values[6]);
		return timerEntry;
	}

	getMonth(): number {
		return this.month;
	}

	getDay(): number {
		return this.day;
	}

	getHour(): number {
		return this.hour;
	}

	getMins(): number {
		return this.mins;
	}

	getSecs(): number {
		return this.secs;
	}

	toSheet(): any[] {
		return [this.getId(), this.month, this.day, this.hour, this.mins, this.secs, this.getDeleted()];
	}
}