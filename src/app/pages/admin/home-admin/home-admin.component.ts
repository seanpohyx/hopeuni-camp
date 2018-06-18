import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GoogleOAuthService } from '../../../service/google-o-auth.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  json: String

  constructor(
    public activatedRouter:ActivatedRoute,
    public router:Router,
    public oauth:GoogleOAuthService,
  ) { }

  validateOAuth(){
    if(!this.oauth.hasOAuth()) {
      this.router.navigate(["/admin/login"]);
    }
  }

  ngOnInit() {
    this.validateOAuth();
  }

}
