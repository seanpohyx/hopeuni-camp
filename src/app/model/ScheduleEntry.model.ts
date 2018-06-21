import { AnnouncementEntry } from "./AnnouncementEntry.model";
import { CAMP_DAYS } from "../utils/campInfo.util";

export class ScheduleEntry extends AnnouncementEntry {
	private day: number;
	private startTime: number;
	private endTime: number;
	private info: string;

	constructor(id: number, description: string, day: number, startTime: number, endTime: number, info?: string, deleted?: number) {
		super(id, description, deleted);
		this.day = day;
		this.startTime = startTime;
		this.endTime = endTime;
		this.info = info;
	}

	getStartDate(): Date {
		const campDay = CAMP_DAYS[this.day];
	    const hour = this.startTime / 100;
	    const minute = this.startTime % 100;
	    return new Date(2018, 6,  +campDay, +hour, +minute);
	}

	getDay(): number {
		return this.day;
	}

	getStartTime(): number {
		return this.startTime;
	}

	getEndTime(): number {
		return this.endTime;
	}

	getInfo(): string {
		return this.info;
	}

	static FromSheet(sheet: string[]): ScheduleEntry {
		return new ScheduleEntry(+sheet[0], sheet[2], +sheet[3], +sheet[4], +sheet[5], sheet[6], +sheet[1]);
	}
	
}