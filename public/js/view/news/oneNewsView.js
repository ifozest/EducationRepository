define([
  'jquery',
  'underscore',
  'backbone',
  'model/news',
  'text!templates/main/content/fullNewsView.html'

], function ($, _, Backbone, News, template) {

  //Short overview of news
  var NewsFullView = Backbone.View.extend({
    tagName: 'article',
    className: 'newsFullViewContainer',
    initialize: function () {
      this.template = _.template(template);
      this.model = new News();
      this.model.on('fetchSuccess', this.fetchSuccess, this);
      this.model.on('fetchError', this.fetchError, this);
      this.model.on('removeSuccess', this.removeSuccess, this);
      this.model.on('removeError', this.removeError, this);
    },
    events: {
      "click .removeBtn": "removeNews",
      "click .editBtn": "editNews"
    },
    renderOneNews: function (id) {
      this.model.set({_id: id});
      this.model.fetch({
        success: function(model) {
          model.trigger('fetchSuccess');
        },
        error: function(model) {
          model.trigger('fetchError');
        }
      });
    },
    fetchSuccess: function () {
      var renderedContent = this.template({model :this.model.toJSON(), representDate : this.representDate});
      this.$el.html(renderedContent);
    },
    fetchError: function () {
      //TODO do smthng here
      this.$el.html('Cant find any news');
    },
    removeNews: function () {
      this.model.destroy({
        success: function (model) {
          model.trigger('removeSuccess');
        },
        error: function (model) {
          model.trigger('removeError');
        },
        dataType: 'text'
      });
    },
    removeSuccess: function(){
      this.goTo('home', true);
    },
    removeError: function(){
      //TODO render smthng clear
      this.$el.append('CANT REMOVE THIS!');
    },
    editNews: function () {
      this.goTo('editNews/' + this.model.get("_id"));
    }
  });
  return NewsFullView;
});