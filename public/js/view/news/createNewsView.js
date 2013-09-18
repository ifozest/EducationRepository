define([
  'jquery',
  'underscore',
  'backbone',
  'model/news',
  'text!templates/main/content/addNews.html'

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
      var renderedContent = this.template();
      this.$el.html(renderedContent);
      return this;
    },
    addNews: function (e) {
      this.$title = $('#title');
      this.$date = $('#date');
      this.$brief = $('#brief');
      this.$content = $('#content');
      console.log('Create Btn press');
      var title = this.$title.val(),
        date = this.$date.val(),
        brief = this.$brief.val(),
        content = this.$content.val();
      this.model.set({
        title: title,
        date: date,
        brief: brief,
        content: content
      });
      this.model.save();
    },
    validationFails: function () {
      //TODO render validation excptions
      console.log('valid fail');
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
    }
  });

  return AddNewsView;
});