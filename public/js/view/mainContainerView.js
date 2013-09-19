define([
  'jquery',
  'underscore',
  'backbone',
  'view/news/newsCollectionView',
  'view/news/oneNewsView',
  'view/news/modifyNewsView'

], function ($, _, Backbone, NewsCollectionView, OneNewsView, ModifyNewsView) {

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
    },
    renderCreateNews: function() {
      var view = new ModifyNewsView();
      view.renderCreateForm();
      this.$el.html(view.render().el);
    },
    renderEditNews: function(id) {
      var view = new ModifyNewsView();
      view.renderEditForm(id);
      this.$el.html(view.render().el);
    }
  });
  return ContainerView;
});