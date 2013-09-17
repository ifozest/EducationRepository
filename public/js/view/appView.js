define([
  'jquery',
  'underscore',
  'backbone',
  'view/menuView',

  'text!templates/header/header.html',
  'text!templates/main/mainBody.html',
  'text!templates/footer/footer.html'
], function ($, _, Backbone, MenuView, headerTemplate, mainBodyTemplate, footerTemplate) {

  var AppView = Backbone.View.extend({
    tagName: 'article',
    className: 'appView',
    initialize: function () {
      this.$body = $('body');
      this.header = _.template(headerTemplate);
      this.mainBody = _.template(mainBodyTemplate);
      this.footer = _.template(footerTemplate);
      this.menuView = new MenuView();
    },

    //create skeleton of el var
    render: function () {
      this.$mainBody = $(this.mainBody());
      this.$mainBody.append(this.menuView.render().el);
      this.$el.append(this.header).append(this.$mainBody).append(this.footer);
      return this;
    },
    refreshDOM: function () {
      this.$el.empty();
    },
    renderAppView: function () {
      this.$body.prepend(this.render().el);
    },
    showNews: function () {
      alert('show news event');
    },
    createNews: function () {
      alert('create news event');
    }


  });


  return AppView;
});
