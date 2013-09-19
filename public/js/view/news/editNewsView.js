define([
  'jquery',
  'underscore',
  'backbone',
  'model/news',
  'text!templates/main/content/createNews.html'
], function ($, _, Backbone, News, template) {

  var EditNewsView = Backbone.View.extend({
    tagName: 'article',
    className: 'editNews',
    initialize: function () {
      this.template = _.template(template);
      this.model = new News();
      this.model.on('invalid', this.validationFails, this);
      this.model.on('fetchSuccess', this.fetchSuccess, this);
      this.model.on('fetchError', this.fetchError, this);
      this.model.on('editSuccess', this.editSuccess, this);
      this.model.on('editError', this.editError, this);
    },
    events: {
      'click .createBtn': 'editNews',
      'click .cancelBtn': 'cancel'
    },
    renderEditForm: function (id) {
      this.model.set({'_id': id});
      this.model.fetch({
        success: function (model) {
          model.trigger('fetchSuccess');
        },
        error: function (model) {
          model.trigger('fetchError');
        }
      });
    },
    fetchSuccess: function () {
      var renderedContent = this.template(this.model.toJSON());
      this.$el.html(renderedContent);
    },
    fetchError: function () {
      //TODO render smthng clear
      this.$el.html('No news for EDIT!');
    },
    editNews: function () {
      var title = $('#title').val(),
        date = $('#date').val(),
        brief = $('#brief').val(),
        content = $('#content').val();
      this.model.save({
        title: title,
        date: date,
        brief: brief,
        content: content}, {
        success: function (model) {
          model.trigger('editSuccess');
        },
        error: function (model) {
          model.trigger('editError');
        }
      });

    },
    validationFails: function (model, options) {
      console.log('validation fail');
    },
    editSuccess: function () {
      this.goTo('news/' + this.model.get('_id'));
    },
    editError: function () {
      //TODO render smthng clear
      this.$el.append('Cant edit news!');
    },
    cancel: function () {
      this.goTo('news/' + this.model.get('_id'));
    }
  });

  return EditNewsView;

});