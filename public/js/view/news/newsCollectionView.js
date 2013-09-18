define([
  'jquery',
  'underscore',
  'backbone',
  'collection/newsCollection',
  'view/news/shortNewsView'
], function ($, _, Backbone, NewsCollection, NewsView) {

  var NewsCollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'newsCollection',
    initialize: function () {
      this.collection = new NewsCollection();
      this.collection.on('add', this.addNews, this);
      this.collection.fetch({add:true});
    },
    render: function () {
      this.collection.each(function (news) {
        this.addNews(news);
      }, this);
      return this;
    },
    addNews: function (news) {
      var newsView = new NewsView({
        model: news
      });
      this.$el.append(newsView.render().el);
    }
  });

  return NewsCollectionView;

})



