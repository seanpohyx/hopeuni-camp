import { Component, OnInit } from '@angular/core';
import { TestimonyService } from "../../../service/testimony.service";

@Component({ 
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit {

	data:any
  displayLoader:boolean;
  
  constructor(
  	public testimonyService:TestimonyService
  ) { }

  ngOnInit() {
    
    this.displayLoader = true;
  	this.testimonyService.getSheet().subscribe(response => {
      this.data = JSON.stringify(response.values, null, 2);
      this.displayLoader = false;
    })
  }

}
