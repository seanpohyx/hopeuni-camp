import { Component, OnInit } from '@angular/core';
import { FeedbackService } from "../../../service/feedback.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

	data:any;
  displayLoader:boolean;

  constructor(
  	public feedbackService:FeedbackService
  ) { }

  ngOnInit() {
    this.displayLoader = true;
  	this.feedbackService.getSheet().subscribe(response => {
      this.data = JSON.stringify(response.values, null, 2);
      this.displayLoader = false; 
    })
  }

}
