import { Component, OnInit } from '@angular/core';
import { CamperInfoService } from "../../../service/camper-info.service";

@Component({
  selector: 'app-camper-info',
  templateUrl: './camper-info.component.html',
  styleUrls: ['./camper-info.component.scss']
})
export class CamperInfoComponent implements OnInit {

	data:any;

  constructor(
  	public camperInfoService:CamperInfoService
  ) { }

  ngOnInit() {
  	this.camperInfoService.getSheet().subscribe(response => {
      this.data = JSON.stringify(response.values, null, 2);
    })
  }

}
