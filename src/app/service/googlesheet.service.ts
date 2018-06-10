import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class GooglesheetService {

  API_KEY = "AIzaSyAuPPsTAsNyQc4UiByhjvP4kGc_chB0DqA";
  SHEET_ID = "1CaSxTF0GTyjppwlmiuCN36dYt_tjw31E8zYfLJh4grM";

  public load(sheetname: string):Observable<any> {
    const url = "https://sheets.googleapis.com/v4/spreadsheets/"+this.SHEET_ID+"/values/"+sheetname+"?key="+this.API_KEY;
    return this.http.get(url);
  }

  public append(sheetname: string, values: any, access_token: String) {
    const requestBody = { "values": [values] };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const url = "https://sheets.googleapis.com/v4/spreadsheets/"
              + this.SHEET_ID 
              + "/values/" 
              + sheetname 
              + ":append"
              + "?valueInputOption=USER_ENTERED"
    console.log(url, requestBody, headers);
    return this.http.post(url, requestBody, { headers });

  }

  constructor(
  	public http:HttpClient
  ) { }

}
