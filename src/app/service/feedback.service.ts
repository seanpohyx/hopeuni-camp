import { Injectable } from '@angular/core';
import { GooglesheetService } from './googlesheet.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

	sheetname = "feedback";

	public getSheet() {
		return this.googleSheetService.load(this.sheetname)
	}

  constructor(
  	public googleSheetService:GooglesheetService
  ) { }
}
