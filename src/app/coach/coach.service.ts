import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Values} from '../shared/static/values';
import {HttpHelper} from '../shared/http-helper';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class CoachService implements OnInit {

  activityTypes: any[] = [];

  constructor(private http: Http) {
  }

  ngOnInit(): void {
    this.fetchActivityTypes().subscribe(
      (data: any) => {
        Object.keys(data).forEach(key => this.activityTypes.push({Id: key, Value: data[key]}));
        console.warn(this.activityTypes);
      }
    );
  }

  getActivityType(id: number) {
    return this.activityTypes[id];
  }

  getActivityTypes() {
    if (this.activityTypes.length === 0) {
      return this.fetchActivityTypes();
    } else {
      return Observable.create((observer: Observer<any[]>) => {
        observer.next(this.activityTypes);
      });
    }
  }

  fetchActivityTypes() {
    return this.http.get(Values.url + '/activitytype/getall/').map(
      (response: Response) => {
        this.activityTypes = response.json();
        console.warn(this.activityTypes);
        return this.activityTypes;
      }
    ).catch(HttpHelper.handleErrorObservable);
  }


  getUpcoming(id: number) {
    return this.http.get(Values.url + '/activity/getupcomingforcoach/' + id).map(
      (response: Response) => {
        console.log(response.json());
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

}
