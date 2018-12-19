import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-sesh',
  templateUrl: './create-sesh.component.html',
  styleUrls: ['./create-sesh.component.css']
})

export class CreateSeshComponent implements OnInit {
  seshD: any;
  userD: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.resetSesh();
    this.resetUser();
  }

  resetSesh() {
    this.seshD = {
      name: ""
    };
  };

  resetUser() {
    this.userD = {
      username: ""
    }
  }

  createSesh() {
    let observable = this._httpService.createSesh(this.seshD, this.userD);
    observable.subscribe(data => {
      if (data['message'] == "Success") {
        let sid = data['sesh']['_id'];
        this._router.navigate(['/sesh/'+  sid]);
      };
    });
  };
}
