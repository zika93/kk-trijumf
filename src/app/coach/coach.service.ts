import {Injectable, OnInit} from '@angular/core';
import { Response} from '@angular/http';
import {Values} from '../shared/static/values';
import {HttpHelper} from '../shared/http-helper';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {HttpAuthClient} from '../auth/http-auth-client';
import {Coach} from '../model/coach.model';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class CoachService implements OnInit {

  activityTypes: any[] = [];

  constructor(private http: HttpAuthClient) {
  }

  ngOnInit(): void {
    this.fetchActivityTypes().subscribe(
      (data: any) => {
        Object.keys(data).forEach(key => this.activityTypes.push({Id: key, Value: data[key]}));
        // console.warn(this.activityTypes);
      }
    );
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
        // console.warn(this.activityTypes);
        return this.activityTypes;
      }
    ).catch(HttpHelper.handleErrorObservable);
  }


  getUpcoming(id: number) {
    return this.http.get(Values.url + '/activity/getupcomingforcoach/' + id).map(
      (response: Response) => {
        // console.log(response.json());
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  getGroups(id: number) {
    return this.http.get(Values.url + '/group/getgroupsforcoach/' + id).map(
      (response: Response) => {
        // console.log(response.json());
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  getCoaches() {
    return this.http.get(Values.url + '/coach/getall/').map(
      (response: Response) => {
        // console.log('getCoaches:');
        // console.log(response.json());
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  getCoach(id: string) {
    return this.http.get(Values.url + '/administration/coach/getbyid/' + id).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }


  updateCoach(coach: Coach) {
    return this.http.post(Values.url + '/coach/update/', coach).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  updatePasswordCoach(coach: any, pass: any) {
    coach['AuthToken'] = Cookie.get('auth');
    const data = {
      'Coach': coach,
      'Password': pass
    };
    return this.http.post(Values.url + '/coach/password/', data).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

}
