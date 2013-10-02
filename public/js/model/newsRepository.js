define([
  'jquery',
  'underscore',
  'backbone',
  'model/news',
  'model/newsCollection'
], function ($, _, Backbone, News, NewsCollection) {

  /**
   *  Layer between server and UI,
   *  all rest methods must be covered with deferred object
   */
  var newsRepository = {

    getNewsCollection: function(){
      var dfd = $.Deferred(),
        newsCollection = new NewsCollection();
      newsCollection.fetch({
        error: function () {
          dfd.reject();
        },
        success: function () {
          dfd.resolve(newsCollection);
        }
      });
      return dfd.promise();

    },

    getNewsById: function (id) {
      var dfd = $.Deferred(),
        news = new News({_id: id});
      news.fetch({
        error: function () {
          dfd.reject();
        },
        success: function () {
          dfd.resolve(news);
        }
      });
      return dfd.promise();
    },

    removeNews: function (news) {
      var dfd = $.Deferred();

      news.destroy({
        error: function () {
          dfd.reject();
        },
        success: function () {
          dfd.resolve();
        },
        dataType: 'text'
      });
      return dfd.promise();
    },

    saveNews: function (news, attrs){
      var dfd = $.Deferred();

      news.save(attrs, {
        error: function () {
          dfd.reject();
        },
        success: function () {
          dfd.resolve();
        }
      });
      return dfd.promise();
    }
  };

  return newsRepository;
});