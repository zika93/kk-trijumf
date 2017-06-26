import { Injectable } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthService {

  private isLoggedIn = false;

  constructor() { }

  onLogin(user: string) {
    this.isLoggedIn = true;
    Cookie.set('user', user, 1);
  }

  onLogout() {
    this.isLoggedIn = false;
    Cookie.delete('user');
  }

 isLoggedin() {
    return Cookie.get('user') !=  null;
 }
}
