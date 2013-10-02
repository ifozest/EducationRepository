define([
  'jquery',
  'underscore',
  'backbone',
  'model/newsRepository',
  'view/news/shortNewsView'
], function ($, _, Backbone, newsRepository, NewsView) {

  var NewsCollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'newsCollection',
    initialize: function () {
      this.newsRepository = newsRepository;
    },
    render: function () {
      var self = this;
      $.when(this.newsRepository.getNewsCollection()).then(function (newsCollection) {
        self.collection = newsCollection;
        self._showCollection();
      });
      return this;
    },
    _showCollection: function(){
      this.collection.each(function (news) {
        this._addNews(news);
      }, this);
    },
    _addNews: function (news) {
      var newsView = new NewsView({
        model: news
      });
      this.$el.append(newsView.render().el);
    }
  });
  return NewsCollectionView;
});