import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Values} from '../shared/static/values';
import 'rxjs/Rx';
import {Group} from '../model/group.model';
import {isNullOrUndefined} from 'util';
import {HttpHelper} from '../shared/http-helper';
import {HttpAuthClient} from '../auth/http-auth-client';

@Injectable()
export class GroupService {
  // groups: Group[];

  constructor(private http: HttpAuthClient) {
  }

  // getAll() {
  //   if (isNullOrUndefined(this.groups) || this.groups.length === 0) {
  //     console.log('returning fetched!');
  //     return this.fetchAllGroups();
  //   } else {
  //     return Observable.create((observer: Observer<any[]>) => {
  //       observer.next(this.groups);
  //     });
  //   }
  // }

  // addToGroup(id: number, playersId: number[]) {
  //   console.log('adding players to group');
  //   return this.http.post(Values.url + '/group/add', id, playersId).map(
  //     (response: Response) => {
  //       console.log(response);
  //       return response.json();
  //     }
  //   ).catch(HttpHelper.handleErrorObservable);
  // }

  fetchAllGroups() {
    console.log('fetching!');
    return this.http.get(Values.url + '/group/getall').map(
      (response: Response) => {
        // this.groups = response.json();
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  // getGroup(id: number) {
  //   if (this.groups == null || this.groups.length === 0) {
  //     return this.fetchGroup(id);
  //   }
  //   const group = this.groups.filter(x =>
  //     x.Id === id
  //   );
  //   if (group[0]['Activities']) {
  //     for (const activity of group[0].Activities) {
  //       console.log(activity.Date);
  //       activity.Date = new Date(activity.Date);
  //       console.log(activity.Date);
  //     }
  //   }
  //   if (group != null && group.length > 0) {
  //     return Observable.create((observer: Observer<Group>) => {
  //       observer.next(group[0]);
  //     });
  //   } else {
  //     return this.fetchGroup(id);
  //   }
  // }

  fetchGroup(id: number) {
    return this.http.get(Values.url + '/group/getgroup/' + id).map(
      (response: Response) => {
        const group: Group = response.json();
        // this.changeGroup(group);
        return group;
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  // changeGroup(group: Group) {
  //   console.warn(group);
  //   if (isNullOrUndefined(this.groups)) {
  //     this.groups = [];
  //   }
  //   const objIndex = this.groups.findIndex((obj => obj.Id === group.Id));
  //   if (objIndex !== -1) {
  //     this.groups[objIndex] = group;
  //   } else {
  //     this.groups.push(group);
  //   }
  // }

  updateGroup(group: Group) {
    return this.http.post(Values.url + '/group/update/', group).map(HttpHelper.extractData)
      .catch(HttpHelper.handleErrorObservable);
  }

  createGroup(group: Group) {
    return this.http.post(Values.url + '/group/create/', group).map(HttpHelper.extractData)
      .catch(HttpHelper.handleErrorObservable);
  }
}
