define([
  'underscore',
  'backbone',
  'text!templates/main/menu/menu.html'
], function(_,Backbone,menuTemplate) {

  var MenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'menuBlock',
    events: {
      'click li#showNews' : 'showNewsEvent',
      'click li#createNews' : 'createNewsEvent'
    },
    initialize : function(){
      this.template = _.template(menuTemplate);
    },
    render : function() {
      this.$el.html(this.template);
      return this;
    },
    showNewsEvent : function() {
      this.goTo('home');
    },
    createNewsEvent : function() {
      this.goTo('createNews');
    }
  });
  return MenuView;
});
