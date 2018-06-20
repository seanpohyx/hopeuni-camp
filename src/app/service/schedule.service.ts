import { Injectable } from '@angular/core';
import { GooglesheetService } from './googlesheet.service';
import { Observable } from 'rxjs/Rx';
import { ExtractTopK } from '../utils/entries.util';
import { ScheduleEntry } from '../model/ScheduleEntry.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  sheetname = "schedule";

  public getSheet() {
    return this.googleSheetService.load(this.sheetname)
  }

  public getLatestEntries(limit: number = 0):Observable<any> {
    return Observable.create(observer => {
      this.getSheet().subscribe(response => {
        const latestEntries = ExtractTopK(response.values, limit, ScheduleEntry.FromSheet)
        observer.next(latestEntries);
        observer.complete();
      })
    });
  }

  constructor(
    public googleSheetService:GooglesheetService
  ) { }
}
