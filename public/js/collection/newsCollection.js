define([
  'backbone',
  'model/news'
], function(Backbone, News) {

  var NewsCollection = Backbone.Collection.extend({
    url: '/newsCollection',
    model: News
  });

  return NewsCollection;
});
