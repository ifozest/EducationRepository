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
//        this.model.on('sync', this.render, this);
    },
    events: {
      "click .removeBtn": "removeNews",
      "click .editBtn": "editNews"
    },
    render: function () {
      return this;
    },
    renderOneNews: function (id) {
      this.model.set({_id: id});
      this.model.fetch({
        success: function (model) {
          model.trigger('fetchSuccess');
        },
        error: function (model) {
          model.trigger('fetchError');
        }
      })
    },
    fetchSuccess: function () {
      var renderedContent = this.template(this.model.toJSON());
      this.$el.html(renderedContent);
    },
    fetchError: function () {
      this.$el.html('Cant find any news');
    },
    removeNews: function () {
      this.model.destroy({
        success: function () {
          window.app.navigate('', {trigger: true});
        },
        error: function () {
          alert('Cant remove this!')
        },
        wait: true,
        dataType: 'text'
      });
    },
    editNews: function () {
      app.navigate('editNews/' + this.model.get("_id"), {trigger: true});
    }
  });

  return NewsFullView;
})

