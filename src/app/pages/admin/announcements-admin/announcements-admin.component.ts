import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from "../../../service/announcements.service";
import { MatTableModule } from '@angular/material/table';

@Component({
	selector: 'app-announcements-admin',
	templateUrl: './announcements-admin.component.html',
	styleUrls: ['./announcements-admin.component.scss']
})
export class AnnouncementsAdminComponent implements OnInit {

	displayedColumns = ["id", "description", "edit", "delete"];
	dataSource = [];

	constructor(
		public annoService:AnnouncementsService
	) { }

	ngOnInit() {
		this.annoService.getSheet().subscribe(this.processResponse.bind(this));
	}

	processResponse(response) {
		const headers = response[0]
		const latestEntries = [];
		console.log(response.values);
		for (let i = response.values.length - 1; i > 0; i--) {
			const entry = this.processEntry(response.values[i]);
			const id = entry.id;
			if (latestEntries[id] == null) {
				latestEntries[id] = entry
			}
		}
	
		latestEntries.shift();
		this.dataSource = latestEntries;


	}

	processEntry(entry) {
		return {
			id: entry[1],
			description: entry[0]
		}
	}


	createAnno(id, description) {
		const anno = { id, description };
		this.annoService.appendSheet(anno).subscribe(response => {
			console.log(response);
		});
	}



}
