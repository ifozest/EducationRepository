define([
  'handlebars'
], function(Handlebars){

  /**
   * Represent date as MM/dd/YYYY
   */
  Handlebars.registerHelper('representDate', function (date) {
    var day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear(),
      dateRepresentation = month + '/' + day + '/' + year;
    return new Handlebars.SafeString(dateRepresentation);
  });

});