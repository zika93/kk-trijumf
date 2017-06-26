export class DateHelper {

  public static parseStringToDate(str: string) {
    if (str.length === 10 &&
      ( str.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/) )) {

      const
        day = str.substring(0, 2);
      const
        month = str.substring(3, 5);
      const
        year = str.substring(6, 10);
      return new Date(year + '-' + month + '-' + day);
    }
    return null;
  }

  public static toDateString(date: Date) {
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '.';
  }
}
