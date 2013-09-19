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
      this.predefineInitData();
      this.menuView = new MenuView();
      this.mainContainerView = new MainContainerView();
      this.renderAppView();
    },
    //create skeleton of el var
    render: function () {
      this.$mainBody.append(this.menuView.render().el).append(this.mainContainerView.render().el);
      this.$el.append(this.$header).append(this.$mainBody).append(this.$footer);
      return this;
    },
    renderAppView: function () {
      this.$body.prepend(this.render().el);
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
      this.$body = $('body');
      this.header = _.template(headerTemplate);
      this.mainBody = _.template(mainBodyTemplate);
      this.footer = _.template(footerTemplate);
      this.$header = $(this.header());
      this.$mainBody = $(this.mainBody());
      this.$footer = $(this.footer());
    }
  });
  return AppView;
});