define([
  'jquery',
  'underscore',
  'backbone',
  'model/news',
  'text!templates/main/content/modifyNews.html'
], function ($, _, Backbone, News, template) {

  var ModifyNewsView = Backbone.View.extend({
    tagName: 'article',
    className: 'modifyNews',
    initialize: function () {
      this.template = _.template(template);
      this.model = new News();
      this.model.on('invalid', this.validationFails, this);
      this.model.on('fetchSuccess', this.renderForm, this);
      this.model.on('fetchError', this.fetchError, this);
      this.model.on('modifySuccess', this.modifySuccess, this);
      this.model.on('modifyError', this.modifyError, this);
    },
    events: {
      'click .createBtn': 'modifyNews',
      'click .cancelBtn': 'cancel'
    },
    renderEditForm: function(id){
      this.action = 'edit';
      this.prepareForm(id);
    },
    renderCreateForm: function(){
      this.action = 'create';
      this.prepareForm();
    },
    prepareForm: function(id){
      (id) ? this.fetchNews(id) : this.renderForm();
    },
    fetchNews: function (id) {
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
    renderForm: function () {
      var renderedContent = this.template({model :this.model.toJSON(), representDate : this.representDate});
      this.$el.html(renderedContent);
      this.predefineVariables();
      this.hideErrorMessagesFromPage();
    },
    fetchError: function () {
      //TODO render smthng clear
      this.$el.html('No news for EDIT!');
    },
    modifyNews: function () {
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
          model.trigger('modifySuccess');
        },
        error: function (model) {
          model.trigger('modifyError');
        }
      });
    },
    validationFails: function () {
      this.hideErrorMessagesFromPage();
      var error = this.model.validationError;
      _.each(this.$errors, function (value, key, list) {
        if(_.contains(error, key)){
          value.show();
        }
      });
    },
    modifySuccess: function () {
      this.goToNewsPage();
    },
    modifyError: function () {
      //TODO render smthng clear
      this.$el.append('Cant save news!Internal Error');
    },
    cancel: function () {
      (this.action === 'edit') ? this.goToNewsPage() : this.goTo('home');
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
    },
    goToNewsPage : function() {
      this.goTo('news/' + this.model.get('_id'));
    }
  });

  return ModifyNewsView;

});