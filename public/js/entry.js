/**
 * Entry point of application
 *
 */

define([
  'backbone',
  'router/router'
], function(Backbone, Router){
  var app = new Router();
  Backbone.View.prototype.goTo = function (loc) {
    app.navigate(loc, true);
  };
  Backbone.history.start();
});