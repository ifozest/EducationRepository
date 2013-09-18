define([
  'jquery',
  'underscore',
  'backbone',
  'view/news/newsCollectionView'


], function ($, _, Backbone, NewsCollectionView) {

  var ContainerView = Backbone.View.extend({
    tagName: 'div',
    className: 'container',
    initialize: function () {


    },

    renderNewsList: function () {
      var view = new NewsCollectionView();
      this.$el.html(view.render().el);
    }
  });


  return ContainerView;
});
