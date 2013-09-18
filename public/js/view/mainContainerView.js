define([
  'jquery',
  'underscore',
  'backbone',
  'view/news/newsCollectionView',
  'view/news/oneNewsView'


], function ($, _, Backbone, NewsCollectionView, OneNewsView) {

  var ContainerView = Backbone.View.extend({
    tagName: 'div',
    className: 'container',
    initialize: function () {


    },

    renderNewsList: function () {
      var view = new NewsCollectionView();
      this.$el.html(view.render().el);
    },
    renderOneNews: function(id) {
      var view = new OneNewsView();
      view.renderOneNews(id);
      this.$el.html(view.render().el);
    }
  });


  return ContainerView;
});
