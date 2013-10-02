define([
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/main/menu/menu.html'
], function (_, Backbone, Handlebars, menuTemplate) {

  var MenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'menuBlock',
    initialize: function () {
      this.template = Handlebars.compile(menuTemplate);
    },
    render: function () {
      this.$el.html(this.template);
      return this;
    }
  });
  return MenuView;
});