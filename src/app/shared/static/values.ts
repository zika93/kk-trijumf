export class Values {

  static dayToWarnForMedic = 15;
  static dayToWarnForFees = 15;
  static months = [ 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December' ];
  static dateMatch = /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.](\d{4})\.?$/;
  static dateTimeMatch = /^(\d{2})[\/\-\.](\d{2})[\/\-\.](\d{4})([\/\-\.\ ]\ |\ )(\d{2}):(\d{2})$/;
  // static url =  'http://localhost:51194';
  // static url =  'http://192.168.0.110:50000';
  // static url =  'http://kktrijumf.somee.com';
  // static url =  'http://coach.kktrijumf.com:51194';
  static url =  'http://api.kktrijumf.com:51194';
}
