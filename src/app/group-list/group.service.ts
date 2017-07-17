import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Values} from '../shared/static/values';
import 'rxjs/Rx';
import {Group} from '../model/group.model';

@Injectable()
export class GroupService {
  groups: Group[];

  constructor(private http: Http) {
  }

  getAll() {
    if (this.groups == null || this.groups.length === 0) {
      console.log('returning fetched!');
      return this.fetchAllGroups();
    } else {
      return Observable.create((observer: Observer<any[]>) => {
        observer.next(this.groups);
      });
    }
  }

  addToGroup(id: number, playersId: number[]) {
    console.log('adding players to group');
    return this.http.post(Values.url + '/groups/add', id, playersId).map(
      (response: Response) => {
        console.log(response);
        return response.json();
      }
    ).catch(this.handleErrorObservable);
  }

  fetchAllGroups() {
    console.log('fetching!');
    return this.http.get(Values.url + '/groups/getall').map(
      (response: Response) => {
        this.groups = response.json();
        return response.json();
      }
    ).catch(this.handleErrorObservable);
  }

  getGroup(id: number) {
    if (this.groups == null) {
      return this.fetchGroup(id);
    }
    const group = this.groups.filter(x =>
      x.Id === id
    );
    if (group != null && group.length > 0) {
      return Observable.create((observer: Observer<Group>) => {
        observer.next(group[0]);
      });
    } else {
      return this.fetchGroup(id);
    }
  }

  fetchGroup(id: number) {
    return this.http.get(Values.url + '/groups/get/' + id).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    console.log('Something went wrong!');
    return Observable.throw(error.message || error);
  }
}
