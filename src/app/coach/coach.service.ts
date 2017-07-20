import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Values} from '../shared/static/values';
import {HttpHelper} from '../shared/http-helper';
import 'rxjs/Rx';

@Injectable()
export class CoachService {

  activityType: { [id: number]: string; } = {};

  constructor(private http: Http) {
  }

  getActivityType(id: number) {
    if (Object.keys(this.activityType).length === 0) {
      console.log('returning fetched!');
      return this.fetchActivityTypes(1);
    } else {
      return this.activityType[id];
      }
  }

  fetchActivityTypes(id: number) {
    return this.http.get(Values.url + 'coach/getupcoming/').map(
      (response: Response) => {

        const keys = response.json();
        console.log(keys);
        return this.activityType;
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

}
