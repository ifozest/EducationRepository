/**
 * Entry point of application
 *
 */

define([
  'backbone',
  'router/router'
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
  //Date representation on page
  Backbone.View.prototype.representDate = function(date) {
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return month+'/'+ day+'/'+year;
  };


  Backbone.history.start();
});