import {FormControl} from '@angular/forms';
import {Values} from './static/values';
import {isNullOrUndefined} from 'util';

export class AppValidators {

  public static dateValidator(control: FormControl): { [s: string]: boolean } {
    if (isNullOrUndefined(control.value)) {
      return null;
    }
    if (control.value.length !== 10 || !control.value.toString().match(Values.dateMatch)) {
      return {'wrongFormattedDate': true};
    }
    return null;
  }

  public static dateTimeValidator(control: FormControl): { [s: string]: boolean } {
    if (isNullOrUndefined(control.value)) {
      return null;
    }
    if (control.value.length !== 16 || !control.value.toString().match(Values.dateTimeMatch)) {
      return {'wrongFormattedDateTime': true};
    }
    return null;
  }
}
