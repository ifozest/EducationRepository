define([
  'backbone',
  'view/appView'

], function(Backbone, AppView) {

  var NewsRouter = Backbone.Router.extend({
    routes: {
      'home': 'home',
      "news/:id": 'showNewsContent',
      "createNews": 'createNews',
      "editNews/:id": 'editNews',
      '*actions' : 'default'
    },
    initialize: function () {
      this.appView = new AppView();
    },
    home: function () {
      this.appView.renderNewsList();
    },
    showNewsContent: function (id) {
      this.appView.renderOneNews(id);
    },
    createNews: function () {
      this.appView.renderCreateNews();
    },
    editNews: function (id) {
      this.appView.renderEditNews(id);
    },
    default: function() {
      this.navigate('home', true);
    }
  });
  return NewsRouter;
})

