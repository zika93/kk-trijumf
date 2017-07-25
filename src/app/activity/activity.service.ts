import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Values} from '../shared/static/values';
import {HttpHelper} from '../shared/http-helper';
import {Activity} from '../model/activity.model';

@Injectable()
export class ActivityService {

  constructor(private http: Http) { }

  fetchActivity(id: number) {
    return this.http.get(Values.url + '/activity/get/' + id).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  createActivity(activity: Activity) {
    return this.http.post(Values.url + '/activity/create/', activity).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  updateActivity(activity: Activity) {
    return this.http.post(Values.url + '/activity/update/', activity).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

}
