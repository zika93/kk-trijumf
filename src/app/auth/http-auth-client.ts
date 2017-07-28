import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class HttpAuthClient {

  constructor(private http: Http) {}

  createAuthorizationHeader(headers: Headers) {
    // headers.append('Authorization', 'Basic ' +
    //   btoa('username:password'));
    headers.append('username', Cookie.get('user'));
    headers.append('token', Cookie.get('auth'));
  }

  public get(url) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options);
  }

  public post(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
