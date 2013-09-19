define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/main/content/shortNewsView.html'
], function ($, _, Backbone, template) {

  //Short overview of news
  var NewsShortView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      this.template = _.template(template);
    },
    render: function () {
      var renderedContent = this.template(this.model.toJSON());
      this.$el.html(renderedContent);
      return this;
    }
  });

  return NewsShortView;

});