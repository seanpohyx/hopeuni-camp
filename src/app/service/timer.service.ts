import { Injectable } from '@angular/core';
import { GooglesheetService } from './googlesheet.service';
import { GoogleOAuthService } from './google-o-auth.service';
import { Observable } from 'rxjs/Rx';
import { TimerEntry } from '../model/TimerEntry.model';
import { ExtractTopK } from '../utils/entries.util';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

	sheetname = "timer";

	public getSheet() {
		return this.googleSheetService.load(this.sheetname)
	}

	public getLatestEntries(limit: number):Observable<any> {
		return Observable.create(observer => {
			this.getSheet().subscribe(response => {
				const latestEntries = ExtractTopK(response.values, limit, TimerEntry.FromSheet)
		        observer.next(latestEntries);
		        observer.complete();
			});
		});
	}

	public multiAppendSheet(timer: TimerEntry[]):Observable<any> {
		return this.googleSheetService.append(
			this.sheetname, 
			timer.map(timer => timer.toSheet()), 
			this.googleOAuthService.getAccessToken()
		);
	}

	public appendSheet(timer: TimerEntry):Observable<any> {
		return this.googleSheetService.append(
			this.sheetname, 
			[timer.toSheet()], 
			this.googleOAuthService.getAccessToken()
		);
	}

  constructor(
  	public googleSheetService:GooglesheetService,
  	public googleOAuthService:GoogleOAuthService
  ) {}
}
