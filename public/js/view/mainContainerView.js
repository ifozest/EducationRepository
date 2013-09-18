define([
  'jquery',
  'underscore',
  'backbone'


],function($, _, Backbone) {

  var ContainerView = Backbone.View.extend({
    tagName: 'div',
    className : 'container',

    renderListOfNews : function() {
      this.$el.html('Hello');
    }
  });


  return ContainerView;
});
