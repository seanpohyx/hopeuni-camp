import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GoogleOAuthService {
  endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  clientId = "947394714759-dfj9erkpjkc7ovptjs177gmlpfb0nb1d.apps.googleusercontent.com";
  clientSecret = "_zSNCEfA16GkLs92_-0Gor9x";
  redirectUri = "http://localhost:4200/admin";
  responseType = "token";
  scopes = Array.prototype.join.call([
    "https://www.googleapis.com/auth/spreadsheets"
  ], " ");
  apiEndPoint: String;

  

  constructor(public http:HttpClient) { 
    this.apiEndPoint = this.endpoint + "?" + Array.prototype.join.call([
        "scope=" + this.scopes,
        "response_type=" + this.responseType,
        "redirect_uri=" + this.redirectUri,
        "client_id=" + this.clientId
      ], "&");
  }

  getAuthUrl(): String {
    return this.apiEndPoint;
  }

  getAccessToken(): String {
    return localStorage.getItem("access_token");
  }

  hasOAuth(): boolean {
    return localStorage.getItem("access_token") != null && 
            localStorage.getItem("expires_in") != null &&
            new Date(localStorage.getItem("expires_in")).getTime() - new Date().getTime() > 0
  }

  saveOAuth(params:any): void {
    console.log("Saving OAuth");

    const now = new Date();
    now.setSeconds(+now.getSeconds() + +params.expires_in);
    localStorage.setItem("access_token", params.access_token);
    localStorage.setItem("token_type", params.token_type);
    localStorage.setItem("expires_in", now);
  }

  extractToken(hashString:String): String {
    const params = {}
    hashString.substr(1).split("&").map((parts) => {
      const keyValue = parts.split("=");
      params[keyValue[0]] = keyValue[1];
    })
    this.saveOAuth(params);
    return params['access_token'];
  }


}
