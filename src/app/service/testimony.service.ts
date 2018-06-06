import { Injectable } from '@angular/core';
import { GooglesheetService } from './googlesheet.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonyService{

	sheetname = "testimony";

	public getSheet() {
		return this.googleSheetService.load(this.sheetname)
	}

  constructor(
  	public googleSheetService:GooglesheetService
  ) {}
}
