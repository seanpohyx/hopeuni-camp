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

  requiresLogin(): boolean{
    return !this.oauth.hasOAuth();
  }

  ngOnInit() {
    const arr = ["hello", "byebye", ["a", "b", {"d" : "Hello"}]]
    this.json = JSON.stringify(arr, null, 2);
  }

}
