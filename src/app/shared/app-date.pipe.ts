import { Pipe, PipeTransform } from '@angular/core';
import {DateHelper} from './date-helper';

@Pipe({
  name: 'appDatePipe'
})
export class AppDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === null) {
      return '';
    }
    // console.warn(value);
    return DateHelper.toDateString(value);
  }
}
