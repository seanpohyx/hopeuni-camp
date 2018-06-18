import { Component, OnInit } from '@angular/core';
import { GoogleOAuthService } from '../../../service/google-o-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-admin',
  templateUrl: './redirect-admin.component.html',
  styleUrls: ['./redirect-admin.component.scss']
})
export class RedirectAdminComponent implements OnInit {

  PROCESSING = 1;
  ERROR = 2;
  SUCCESS = 3;
  state = this.PROCESSING;
  error = "No Error";

  constructor(
    private oauth:GoogleOAuthService,
    private route:Router
  ) { }

  ngOnInit() {
    this.processAccessToken(window.location.hash);
  }

  processAccessToken(hashString:String): void {
    const hasAccessKey = hashString.includes("access_token=");
    if (!hasAccessKey) {
      this.error = "Invalid Url: No access token";
      this.state = this.ERROR;
      return;
    }

    const accessToken = this.extrctAccessToken(hashString)
    if (this.oauth.isValidAccessToken(accessToken)) {
      this.state = this.SUCCESS;
      this.oauth.saveOAuth(accessToken);
      this.route.navigate(["/admin"]);
    } else {
      this.state = this.ERROR;
      this.error = "Invalid Url: Invalid Access Token: " + JSON.stringify(accessToken);
    }
  }

  extrctAccessToken(hashString:String): any {
    const params = {};
    hashString.substr(1).split("&").map((parts) => {
      const keyValue = parts.split("=");
      params[keyValue[0]] = keyValue[1];
    });
    return params;
  }
}