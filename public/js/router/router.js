/**
 * Entry point of application
 */

define([
  'backbone',
  'view/appView'

], function(Backbone, AppView) {

  var NewsRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      "news/:id": 'showNewsContent',
      "createNews": 'createNews',
      "editNews/:id": 'editNews'
    },
    initialize: function () {
      this.appView = new AppView();
    },
    home: function () {
      this.appView.renderAppView();
    },
    showNewsContent: function (id) {

    },
    createNews: function () {

    },
    editNews: function (id) {

    }
  });
  var app = new NewsRouter();
  Backbone.history.start();
})

