define([
  'jquery',
  'backbone'
], function ($, Backbone) {

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
      if ($.trim(attr.title) === '') {
        return 'title must be defined';
      }
    }
  });

  return News;
});



