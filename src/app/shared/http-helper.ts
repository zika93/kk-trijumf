import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import 'rxjs/Rx';

export class HttpHelper {

  static extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  static handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    console.log('Something went wrong!');
    return Observable.throw(error.message || error);
  }
}
