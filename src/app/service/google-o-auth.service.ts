import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GoogleOAuthService {
	endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
	clientId = "947394714759-dfj9erkpjkc7ovptjs177gmlpfb0nb1d.apps.googleusercontent.com";
	scopes = [
		"https://www.googleapis.com/auth/drive",
		"https://www.googleapis.com/auth/drive.file",
		"https://www.googleapis.com/auth/spreadsheets"
	]
	redirectUri = "http://localhost:8000";
	responseType = "token";

	apiEndPoint:string;

	makeApiEndPoint():string {
		return this.endpoint + "?" + Array.prototype.join.call([
				"scope=" + Array.prototype.join.call(this.scopes, " "),
				"response_type=" + this.responseType,
				"redirect_uri=" + this.redirectUri,
				"client_id=" + this.clientId
			], "&");
	}

  constructor() { 
  	this.apiEndPoint = this.makeApiEndPoint();
  }
}
