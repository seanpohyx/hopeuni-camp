import { Injectable } from '@angular/core';
import { GooglesheetService } from './googlesheet.service';
import { GoogleOAuthService } from './google-o-auth.service';
import { Observable } from 'rxjs/Rx';
import { AnnouncementEntry } from '../model/AnnouncementEntry.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

	sheetname = "announcements";

	public getSheet() {
		return this.googleSheetService.load(this.sheetname)
	}

	public getLatestEntries(limit: number):Observable<any> {
		return Observable.create(observer => {
			this.getSheet().subscribe(response => {
				const latestEntries = [];
				for (let i = response.values.length - 1; i > 0; i--) {
					const entry = AnnouncementEntry.FromSheet(response.values[i]);
					if (latestEntries[entry.getId()] == null) {
						latestEntries[entry.getId()] = entry
					}
				}
				
				observer.next(latestEntries
								.filter(anno => anno != null && !anno.isDeleted())
								.slice(-limit)
								.reverse());
				observer.complete();
			})
		})
	}

	public multiAppendSheet(announcements: AnnouncementEntry[]):Observable<any> {
		return this.googleSheetService.append(
			this.sheetname, 
			announcements.map(anno => anno.toSheet()), 
			this.googleOAuthService.getAccessToken()
		);
	}

	public appendSheet(announcement: AnnouncementEntry):Observable<any> {
		return this.googleSheetService.append(
			this.sheetname, 
			[announcement.toSheet()], 
			this.googleOAuthService.getAccessToken()
		);
	}

  constructor(
  	public googleSheetService:GooglesheetService,
  	public googleOAuthService:GoogleOAuthService
  ) {}
}
