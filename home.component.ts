import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  createSesh: boolean = false;
  joinSesh: boolean = false;
  lastBtnEvent: any;

  ngOnInit() {
    this.createSesh = false;
    this.joinSesh = false;
  }

  createBtnPressed(event: any) {
    if (this.lastBtnEvent) {
      this.lastBtnEvent['className'] = "btn btn-lg btn-primary"
    }

    this.joinSesh = false;
    if (this.createSesh) {
      this.createSesh = false;
    } else {
      event['srcElement']['className'] = "btn btn-lg btn-secondary"
      this.createSesh = true;
    };

    this.lastBtnEvent = event['srcElement'];
  };

  joinBtnPressed(event: any) {
    if (this.lastBtnEvent) {
      this.lastBtnEvent['className'] = "btn btn-lg btn-primary"
    }

    this.createSesh = false;
    
    if (this.joinSesh) {
      this.joinSesh = false;
    } else {
      event['srcElement']['className'] = "btn btn-lg btn-secondary"
      this.joinSesh = true;
    };

    this.lastBtnEvent = event['srcElement'];
  };
}
