define([
  'jquery',
  'underscore',
  'backbone',
  'view/menuView',
  'view/mainContainerView',

  'text!templates/header/header.html',
  'text!templates/main/mainBody.html',
  'text!templates/footer/footer.html'
], function ($, _, Backbone, MenuView, MainContainerView, headerTemplate, mainBodyTemplate, footerTemplate) {

  var AppView = Backbone.View.extend({
    tagName: 'article',
    className: 'appView',
    initialize: function () {
      this.menuView = new MenuView();
      this.mainContainerView = new MainContainerView();
      this.renderAppView();
    },
    renderAppView: function () {
      var $body = $('body');
//      $body.empty();
      $body.prepend(this.render().el);
      this.predefineInitData();
      this.$el.append(this.header()).append(this.mainBody()).append(this.footer());
      this.$mainBody = this.$el.find('.mainBody'); //smthng wrong here
      this.$mainBody.append(this.menuView.render().el).append(this.mainContainerView.render().el);
    },
    renderNewsList: function () {
      this.mainContainerView.renderNewsList();
    },
    renderOneNews: function (id) {
      this.mainContainerView.renderOneNews(id);
    },
    renderCreateNews: function () {
      this.mainContainerView.renderCreateNews();
    },
    renderEditNews: function (id) {
      this.mainContainerView.renderEditNews(id);
    },
    predefineInitData: function () {
      this.header = _.template(headerTemplate);
      this.mainBody = _.template(mainBodyTemplate);
      this.footer = _.template(footerTemplate);
    }
  });
  return AppView;
});