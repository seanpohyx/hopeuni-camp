import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from "../../../service/announcements.service";
import { AnnouncementEntry } from "../../../model/AnnouncementEntry.model";

@Component({
	selector: 'app-announcements-admin',
	templateUrl: './announcements-admin.component.html',
	styleUrls: ['./announcements-admin.component.scss']
})
export class AnnouncementsAdminComponent implements OnInit {

	displayedColumns = ["description", "delete"];
	dataSource = [];
	limit = 5;

	constructor(
		public annoService:AnnouncementsService
	) { }

	ngOnInit() {
		this.loadSheet();

	}

	loadSheet() {
		this.annoService.getLatestEntries(this.limit).subscribe((entries) => {
			this.dataSource = entries;
		})
	}

	processEntry(entry) {
		return AnnouncementEntry.FromSheet(entry);
	}

	createAnno(id, description) {
		const anno = new AnnouncementEntry(id, description);
		this.annoService.appendSheet(anno).subscribe(response => {
			console.log(response);
			this.loadSheet();
		});
	}

	onAdd(description: any) {
		const nextId = (this.dataSource[0]) ? this.dataSource[0].getId() + 1 : 1;
		const updates = [new AnnouncementEntry(nextId, description.value)];
		if (this.dataSource.length == this.limit) {
			const lastEntry = this.dataSource[this.limit - 1];
			lastEntry.delete();
			updates.push(lastEntry);
		}
		this.annoService.multiAppendSheet(updates).subscribe(response => {
			this.loadSheet();
		})
	}

	onDelete(entry) {
		entry.delete();
		this.annoService.appendSheet(entry).subscribe(response => {
			console.log(response);
			this.loadSheet();
		})
	}



}
