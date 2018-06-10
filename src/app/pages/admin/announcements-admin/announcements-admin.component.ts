import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from "../../../service/announcements.service";

@Component({
	selector: 'app-announcements-admin',
	templateUrl: './announcements-admin.component.html',
	styleUrls: ['./announcements-admin.component.scss']
})
export class AnnouncementsAdminComponent implements OnInit {

	constructor(
		public annoService:AnnouncementsService
	) { }

	ngOnInit() {

	}

	createAnno(id, description) {
		const anno = { id, description };
		this.annoService.appendSheet(anno).subscribe(response => {
			console.log(response);
		});
	}



}
