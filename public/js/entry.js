/**
 * Entry point of application
 *
 */

define([
  'backbone',
  'router/router',
  'handlebarsHelpers'
], function (Backbone, Router) {
  var app = new Router();

  /**
   * Add possibility to navigate from views
   * @param loc
   * @param [replace] if need to replace url
   */
  Backbone.View.prototype.goTo = function (loc, replace) {
    var opt = {trigger: true};
    opt.replace = replace || false;
    app.navigate(loc, opt);

  };

  Backbone.history.start();
});