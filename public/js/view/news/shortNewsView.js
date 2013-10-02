define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/main/content/shortNewsView.html'
], function ($, _, Backbone, Handlebars, template) {

  //Short overview of news
  var NewsShortView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      this.template = Handlebars.compile(template);
    },
    render: function () {
      var renderedContent = this.template({model : this.model.toJSON()});
      this.$el.html(renderedContent);
      return this;
    }
  });

  return NewsShortView;

});