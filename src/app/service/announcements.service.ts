import { Injectable } from '@angular/core';
import { GooglesheetService } from './googlesheet.service';
import { GoogleOAuthService } from './google-o-auth.service';
import { Observable } from 'rxjs/Rx';
import { AnnouncementEntry } from '../model/AnnouncementEntry.model';
import { ExtractTopK } from '../utils/entries.util';

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
				const latestEntries = ExtractTopK(response.values, limit, AnnouncementEntry.FromSheet)
		        observer.next(latestEntries);
		        observer.complete();
			});
		});
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
