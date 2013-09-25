define([
  'jquery',
  'underscore',
  'backbone',
  'util/dateHelper'
], function ($, _, Backbone, dateHelper) {

  var News = Backbone.Model.extend({
    defaults: {
      title: '',
      date: new Date(),
      brief: '',
      content: ''
    },
    idAttribute: '_id',
    urlRoot: '/news',
    validate: function (attr) {
      var errors = [];
      if ($.trim(attr.title) === '' || attr.title.length > 100) {
        errors.push('titleError');
      }
      if (!dateHelper.dateHelper.isDatePatternValid(attr.date)) {
        errors.push('dateError');
      }
      if ($.trim(attr.brief) === '' || attr.brief.length > 150) {
        errors.push('briefError');
      }
      if ($.trim(attr.content) === '' || attr.content.length > 1000) {
        errors.push('contentError');
      }
      return (!_.isEmpty(errors)) ? errors : null;
    },
    parse: function (response) {
      var json = Backbone.Model.prototype.parse.call(this, response);
      json.date = new Date(json.date);
      return json;
    },
    //Override for save date as Date object after validation
    set: function (key, val, options) {
      var object = Backbone.Model.prototype.set.call(this, key, val, options);
      if (key.date) {
        if (!_.isDate(key.date)) {
          var splittedDate = key.date.split('/');
          var day = splittedDate[1];
          var month = splittedDate[0] - 1;
          var year = splittedDate[2];
          var date = new Date(year, month, day);
          object.set({date: date});
        }
      }
      return object;
    }
  });

  return News;
});