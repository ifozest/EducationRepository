define([
  'underscore',
  'backbone',
  'text!templates/main/menu/menu.html'
], function (_, Backbone, menuTemplate) {

  var MenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'menuBlock',
    initialize: function () {
      this.template = _.template(menuTemplate);
    },
    render: function () {
      this.$el.html(this.template);
      return this;
    }
  });
  return MenuView;
});