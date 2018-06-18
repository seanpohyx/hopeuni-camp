import { Injectable } from '@angular/core';
import { GooglesheetService } from './googlesheet.service';
import { GoogleOAuthService } from './google-o-auth.service';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

	sheetname = "announcements";

	public getSheet() {
		return this.googleSheetService.load(this.sheetname)
	}

	public appendSheet(announcement: {description: String, id: Number}):Observable<any> {
		const accessToken = this.googleOAuthService.getAccessToken();
		return this.googleSheetService.append(this.sheetname, 
			[announcement.description, announcement.id], 
			accessToken);
	}

  constructor(
  	public googleSheetService:GooglesheetService,
  	public googleOAuthService:GoogleOAuthService
  ) {}
}
