import {Values} from './static/values';

export class DateHelper {

  public static parseStringToDate(str) {
    if (str instanceof Date) {
      return str;
    }
    if (typeof str === 'string'
      &&
      str.length === 10 &&
      ( str.match(Values.dateMatch) )) {

      const
        day = str.substring(0, 2);
      const
        month = str.substring(3, 5);
      const
        year = str.substring(6, 10);
      return this.fixOffset(new Date(year + '-' + month + '-' + day));
    }
    return null;
  }

  public static parseStringToDateTime(str) {
    if (str instanceof Date) {
      return str;
    }
    if (typeof str === 'string'
      &&
      str.length === 16
      &&
      ( str.match(Values.dateTimeMatch) )
    ) {

      const
        day = str.substring(0, 2);
      const
        month = str.substring(3, 5);
      const
        year = str.substring(6, 10);
      const
        hour = str.substring(11, 13);
      const
        min = str.substring(14, 16);
      const date = new Date(year + '-' + month + '-' + day);
      date.setHours(+hour);
      date.setMinutes(+min);
      return this.fixOffset(date);
    }
    console.log('bad format!');
    return null;
  }

  public static toDateString(date: Date) {
    date = new Date(date);
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '.';
  }

  private static fixOffset(date: Date) {
    // const _offset = 2 * 60 * 60000; // maybe 3 [h*60*60000 = ms]
    const _userOffset = date.getTimezoneOffset() * 60000; // [min*60000 = ms]
    const time = new Date(date.getTime() - _userOffset);
    return time;
  }
}
