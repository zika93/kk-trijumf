import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import {Fee} from '../model/fee.model';
import {Values} from 'app/shared/static/values';
import {HttpHelper} from '../shared/http-helper';
import {HttpAuthClient} from '../auth/http-auth-client';

@Injectable()
export class FeesService {

  constructor(private http: HttpAuthClient) { }

  createFee(fee: Fee) {
    return this.http.post(Values.url + '/fee/create/', fee).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  updateFee(fee: any) {
    return this.http.post(Values.url + '/fee/update/', fee).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }
}
