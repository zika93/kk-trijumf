import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoadingService {

  static START_LOADING = true;
  static STOP_LOADING = false;

  loading = new Subject<boolean>();

  constructor() {
  }

  display(value: boolean) {
    this.loading.next(value);
  }

  show() {
    setTimeout(this.loading.next(true), 0);
  }

  hide() {
    setTimeout(this.loading.next(false), 0);
  }
}

export const LOADER = new LoadingService();
