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
    //TODO overwrite this
    validate: function (attr) {
      var errors = [];
      if ($.trim(attr.title) === '') {
        errors.push('title');
      }
      if ($.trim(attr.date) === '') {
        errors.push('date');
      }
      if ($.trim(attr.brief) === '') {
        errors.push('brief');
      }
      if ($.trim(attr.content) === '') {
        errors.push('content');
      }
      return (!_.isEmpty(errors)) ? errors : null;
    }
  });

  return News;
});