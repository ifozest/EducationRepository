define([
  'underscore'

], function (_) {

  var DATE_REGEXP = '^(0?[1-9]|1[0-2])/(0?[1-9]|[1-2][0-9]|3[0-1])/([1-2][0-9][0-9][0-9])$';

  //Array of months with a length of 30 days(in numbers)
  var MONTHS_WITH_30_DAYS = [4, 6, 9, 11];

  var dateHelper = {
    regExp: new RegExp(DATE_REGEXP)
  };

  dateHelper.parse = function (datePattern) {
    return this.regExp.exec(datePattern);
  };

  dateHelper.isDateCorrect = function (month, day, year) {

    if (_.contains(MONTHS_WITH_30_DAYS, month) && (day > 30)) {
      return false;
    } else if ((month === 2) && (day > 28) && (year % 4 !== 0)) {
      return false;
    } else if ((month === 2) && (day > 29) && (year % 4 === 0)) {
      return false;
    }
    return true;
  };


  dateHelper.isDatePatternValid = function (date) {
    if (!_.isDate(date)) {
      var result = this.parse(date);
      if (result) {
        var month = +result[1],
          day = +result[2],
          year = +result[3];
        return this.isDateCorrect(month, day, year);
      } else {
        return false;
      }
    }
    return true;
  };


  return {dateHelper: dateHelper};
});