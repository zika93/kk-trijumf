import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class PlayerService {

  constructor(private http: Http) { }

  getAll() {
    return this.http.get('http://localhost:51194/players/getall').map(
      (response: Response) => {
        return response.json();
      }
    );
  }

}
