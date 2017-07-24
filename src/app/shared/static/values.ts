export class Values {

  static dateMatch = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  static dateTimeMatch = /^(\d{2})[\/\-](\d{2})[\/\-](\d{4}) (\d{2}):(\d{2})$/;
  static url = 'http://192.168.0.110:50000';
  static userImage = 'data:image/jpeg;base64,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';

}
