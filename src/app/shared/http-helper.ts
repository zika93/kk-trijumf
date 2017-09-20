import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import 'rxjs/Rx';
import {LOADER} from './loading.service';

export class HttpHelper {


  static extractData(res: Response) {
    const body = res.json();

    LOADER.display(true);
    return body.data || {};
  }


  static handleErrorObservable(error: Response | any) {

    LOADER.display(false);
    console.error(error.message || error);
    console.log('Something went wrong!');
    return Observable.throw(error.message || error);
  }
}
