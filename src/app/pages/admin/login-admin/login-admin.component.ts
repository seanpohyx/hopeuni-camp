import { Component, OnInit } from '@angular/core';
import { GoogleOAuthService } from '../../../service/google-o-auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  constructor(private oauth:GoogleOAuthService) { }

  getAuthLink() {
  	return this.oauth.getAuthUrl();
  }

  ngOnInit() {
  }

}
