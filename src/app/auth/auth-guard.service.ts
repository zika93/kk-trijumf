import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate/*, CanActivateChild*/ {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.auth.isLoggedin() === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

 /* canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if ( this.auth.isLoggedin() === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }*/


}
