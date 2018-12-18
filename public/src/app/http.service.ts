import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllSeshes() {
    return this._http.get('/db/v1/seshes');
  };

  getSeshByID(id: string) {
    return this._http.get('/db/v1/seshes/'+ id);
  };

  createSesh(sesh: any, user: any) {
    return this._http.post('/db/v1/seshes', {
      sesh: sesh,
      user: user
    });
  };

  destorySesh(id: string) {
    return this._http.delete('/db/v1/seshes/'+ id);
  };

  addAttendeeToSesh(id: string, attendee: any) {
    
  }
}
