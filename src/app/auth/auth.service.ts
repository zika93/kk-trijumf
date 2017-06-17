import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private isLoggedIn = false;

  constructor() { }

  onLogin() {
    this.isLoggedIn = true;
  }

  onLogout() {
    this.isLoggedIn = false;
  }

 isLoggedin() {
    return this.isLoggedIn;
 }
}
