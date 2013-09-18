define([
  'jquery',
  'underscore',
  'backbone',
  'view/news/shortNewsView'
], function ($, _, Backbone, NewsView) {

  var NewsCollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'newsCollection',
    initialize: function () {
//      this.collection.on('add', this.addNews, this);
    },
    render: function () {
      this.collection.each(function (news) {
        this.addNews(news);
      }, this);
      return this;
    },
    addNews: function (news) {
      var newsView = new NewsShortView({
        model: news
      });
      this.$el.append(newsView.render().el);
    },
    fetchData: function () {
      this.collection.fetch({add: true});
    }
  });

  return NewsCollectionView;

})



