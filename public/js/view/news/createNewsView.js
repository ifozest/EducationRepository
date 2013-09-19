define([
  'jquery',
  'underscore',
  'backbone',
  'model/news',
  'text!templates/main/content/createNews.html'

], function ($, _, Backbone, News, template) {

  var AddNewsView = Backbone.View.extend({
    tagName: 'article',
    className: 'addNews',
    initialize: function () {
      this.template = _.template(template);
      this.model = new News();
      this.model.on('invalid', this.validationFails, this);
      this.model.on('sync', this.saveSuccess, this);
      this.model.on('error', this.saveError, this);

    },
    events: {
      'click .createBtn': 'addNews',
      'click .cancelBtn': 'cancel'
    },
    render: function () {
      var renderedContent = this.template(this.model.toJSON());
      this.$el.html(renderedContent);
      this.predefineVariables();
      this.hideErrorMessagesFromPage();
      return this;
    },
    addNews: function (e) {
      var title = $('#title').val(),
        date = $('#date').val(),
        brief = $('#brief').val(),
        content = $('#content').val();
      this.model.save({
        title: title,
        date: date,
        brief: brief,
        content: content
      });
    },
    validationFails: function () {
      this.hideErrorMessagesFromPage();
      var error = this.model.validationError;
      console.log(error);
      _.each(this.$errors, function (value, key, list) {
        if(_.contains(error, key)){
          value.show();
        }
      });
    },
    saveSuccess: function (model) {
      this.goTo('news/' + model.get('_id'));
    },
    saveError: function () {
      //TODO render save error message
      console.log('save error');
    },
    cancel: function () {
      this.goTo('home');
    },
    predefineVariables: function () {
      this.$errors = {
        titleError: this.$el.find('#titleError'),
        dateError: this.$el.find('#dateError'),
        briefError: this.$el.find('#briefError'),
        contentError: this.$el.find('#contentError')
      };
    },
    hideErrorMessagesFromPage: function() {
      _.each(this.$errors, function (value, key, list) {
        value.hide();
      });
    }
  });

  return AddNewsView;
});