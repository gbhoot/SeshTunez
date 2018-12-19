import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-sesh-room',
  templateUrl: './sesh-room.component.html',
  styleUrls: ['./sesh-room.component.css']
})

export class SeshRoomComponent implements OnInit {
  sid: string;
  seshD: any;
  username: string;
  searchEnable: boolean = false;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    // this.resetSesh();
    this._route.params.subscribe((params: Params) => {
      this.sid = params['id'];
      this.getSeshData();
    })
  }

  resetSesh() {
    this.seshD = {
      name: ""
    }
  }

  getSeshData() {
    let observable = this._httpService.getSeshByID(this.sid);
    observable.subscribe(data => {
      this.seshD = data['sesh'][0];
    });
  };

  songSearchBtnPressed() {
    if (this.searchEnable) {
      this.searchEnable = false;
    } else {
      this.searchEnable = true;
    };
  };
}
