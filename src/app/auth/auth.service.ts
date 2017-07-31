import { Injectable } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Http, Response} from '@angular/http';
import {Values} from '../shared/static/values';
import {HttpHelper} from '../shared/http-helper';

@Injectable()
export class AuthService {

  private isLoggedIn = false;

  constructor(private http: Http) { }

  onLogin(user: string) {
    this.isLoggedIn = true;
    Cookie.deleteAll();
    Cookie.set('user', user, 0.1);
  }

  onLoginCoach(coach: any, callback: () => any) {
    this.onLogout();
    this.isLoggedIn = true;
    Cookie.set('user', coach.Username, 0.2);
    Cookie.set('id', coach.Id, 0.2);
    Cookie.set('auth', coach.AuthToken, 0.2);
    callback();
  }


  onLogout() {
    this.isLoggedIn = false;
    Cookie.delete('user');
    Cookie.delete('id');
    Cookie.delete('auth');
    Cookie.deleteAll();
  }

 isLoggedin() {
    return Cookie.get('user') !=  null && this.isLoggedIn;
 }


  tryLogIn(username: string, password: string) {
    const data = {
      'username': username,
      'password': password
    };
    return this.http.post(Values.url + '/coach/login/', data).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }
}
