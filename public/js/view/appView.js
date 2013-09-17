define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header/header.html'
], function($, _, Backbone, headerTemplate){

  var AppView = Backbone.View.extend({
    tagName: 'article',
    className: 'appView',
    initialize: function () {
      this.$body = $('body');
      this.header = _.template(headerTemplate);
    },

    render: function () {
      this.$el.html(this.header);
      return this;
    },
    renderAppView: function () {
      this.$body.append(this.render().el);
    }


  });


  return AppView;
});
