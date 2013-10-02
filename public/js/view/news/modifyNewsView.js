define([
  'jquery',
  'underscore',
  'backbone',
  'model/news',
  'model/newsRepository',
  'text!templates/main/content/modifyNews.html'
], function ($, _, Backbone, News, newsRepository, template) {

  var ModifyNewsView = Backbone.View.extend({
    tagName: 'article',
    className: 'modifyNews',
    initialize: function () {
      this.newsRepository = newsRepository;
      this.template = _.template(template);
      this.model = new News();
      this.model.on('invalid', this._validationFails, this);
    },
    events: {
      'click .createBtn': 'modifyNews',
      'click .cancelBtn': 'cancel'
    },
    renderEditForm: function (id) {
      this.action = 'edit';
      this._prepareForm(id);
    },
    renderCreateForm: function () {
      this.action = 'create';
      this._renderForm();
    },
    modifyNews: function () {
      var self = this;
      var attrs = {
        title: $('#title').val(),
        date: $('#date').val(),
        brief: $('#brief').val(),
        content: $('#content').val()
      };
      $.when(this.newsRepository.saveNews(this.model, attrs)).then(function () {
        self._goToNewsPage();
      }, function () {
        self._renderModifyError();
      });
    },
    cancel: function () {
      if (this.action === 'edit') {
        this._goToNewsPage();
      } else {
        this.goTo('home');
      }
    },
    _prepareForm: function (id) {
      var self = this;
      $.when(this.newsRepository.getNewsById(id)).then(function (model) {
        self.model = model;
        self.listenTo(self.model, 'invalid', self._validationFails);
        self._renderForm();
      }, function () {
        self._renderNoNewsFound();
      });
    },
    _renderForm: function () {
      var renderedContent = this.template({model: this.model.toJSON(), representDate: this.representDate});
      this.$el.html(renderedContent);
      this._predefineVariables();
      this._hideErrorMessagesFromPage();
    },
    _renderNoNewsFound: function () {
      //TODO render smthng clear
      this.$el.html('No news for EDIT!');
    },
    _validationFails: function () {
      this._hideErrorMessagesFromPage();
      var error = this.model.validationError;
      _.each(this.$errors, function (value, key) {
        if (_.contains(error, key)) {
          value.show();
        }
      });
    },
    _renderModifyError: function () {
      //TODO render smthng clear
      this.$el.append('Cant save news!Internal Error');
    },
    _predefineVariables: function () {
      this.$errors = {
        titleError: this.$el.find('#titleError'),
        dateError: this.$el.find('#dateError'),
        briefError: this.$el.find('#briefError'),
        contentError: this.$el.find('#contentError')
      };
    },
    _hideErrorMessagesFromPage: function () {
      _.each(this.$errors, function (value) {
        value.hide();
      });
    },
    _goToNewsPage: function () {
      this.goTo('news/' + this.model.get('_id'));
    }
  });

  return ModifyNewsView;

});