define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'model/newsRepository',
  'text!templates/main/content/fullNewsView.html'

], function ($, _, Backbone, Handlebars, newsRepository, template) {

  //Full overview of news
  var NewsFullView = Backbone.View.extend({
    tagName: 'article',
    className: 'newsFullViewContainer',
    initialize: function () {
      this.newsRepository = newsRepository;
      this.template = Handlebars.compile(template);
    },
    events: {
      'click .removeBtn': 'removeNews',
      'click .editBtn': 'editNews'
    },
    renderOneNews: function (id) {
      var self = this;
      $.when(this.newsRepository.getNewsById(id)).then(function(model){
        self.model= model;
        self._renderOneNewsTemplate();
      }, function (){
        self._renderNoNewsFound();
      });
    },
    removeNews: function () {
      var self = this;
      $.when(this.newsRepository.removeNews(this.model)).then(function () {
        self._goToMainPage();
      }, function(){
        self._renderRemoveErrorMessage();
      });
    },
    editNews: function () {
      this.goTo('editNews/' + this.model.get('_id'));
    },
    _renderOneNewsTemplate: function () {
      var renderedContent = this.template({model :this.model.toJSON()});
      this.$el.html(renderedContent);
    },
    _renderNoNewsFound: function () {
      //TODO render smthng clear
      this.$el.html('Cant find any news');
    },
    _goToMainPage: function(){
      this.goTo('home', true);
    },
    _renderRemoveErrorMessage: function(){
      //TODO render smthng clear
      this.$el.append('CANT REMOVE THIS!');
    }
  });
  return NewsFullView;
});