define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

  var News = Backbone.Model.extend({
    defaults: {
      title: '',
      date: '',
      brief: '',
      content: ''
    },
    idAttribute: '_id',
    urlRoot: '/news',
    //TODO Date validation!
    validate: function (attr) {
      var errors = [];
      if ($.trim(attr.title) === '' || attr.title.length>100) {
        errors.push('titleError');
      }
      if ($.trim(attr.date) === '' || attr.date.length>10) {
        errors.push('dateError');
      }
      if ($.trim(attr.brief) === '' || attr.brief.length>150) {
        errors.push('briefError');
      }
      if ($.trim(attr.content) === '' || attr.content.length>1000) {
        errors.push('contentError');
      }
      return (!_.isEmpty(errors)) ? errors : null;
    }
  });

  return News;
});