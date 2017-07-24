import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoadingService {

  static START_LOADING = true;
  static STOP_LOADING = false;

  loading = new Subject();

  constructor() {
  }

}
