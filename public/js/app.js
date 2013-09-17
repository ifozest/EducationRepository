(function () {

  var template = function (id) {
    return _.template($('#' + id).html());
  };

  //News model
  var News = Backbone.Model.extend({
    defaults: {
      title: '',
      date: '111',
      brief: '',
      content: ''
    },
    idAttribute: '_id',
    urlRoot: '/news',
    validate: function (attr) {
      if ($.trim(attr.title) === '') {
        return 'title must be defined';
      }
    }
  });

  //Short overview of news
  var NewsShortView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      this.template = template('newsShortViewTemplate');
    },
    render: function () {
      console.log('here is a troubles');
      var renderedContent = this.template(this.model.toJSON());
      this.$el.html(renderedContent);
      return this;
    }
  });

  //Short overview of news
  var NewsFullView = Backbone.View.extend({
    tagName: 'article',
    className: 'newsFullViewContainer',
    initialize: function () {
      this.template = template('newsFullViewTemplate');
      this.collection.add(this.model);
      this.model.on('sync', this.render, this);
      this.model.on('destroy', this.removeFromCollection, this);

    },
    events: {
      "click .removeBtn": "removeNews",
      "click .editBtn": "editNews"
    },
    render: function () {
      if (this.model.isValid()) {

        var renderedContent = this.template(this.model.toJSON());
        this.$el.html(renderedContent);
      }
      return this;
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
    removeFromCollection: function (model, collection) {
      collection.remove(model);
    },
    editNews : function(){
      app.navigate('editNews/' + this.model.get("_id"), {trigger: true});
    }
  });

  var AddNewsView = Backbone.View.extend({
    tagName: 'article',
    className: 'addNews',
    initialize: function () {
      this.template = template('addNewsTemplate');

      this.model.on('invalid', this.validationFails);
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
    validationFails: function () {
      console.log(arguments);
    },
    addNews: function (e) {
      console.log('Create Btn press');
      this.$title = $('#title');
      this.$date = $('#date');
      this.$brief = $('#brief');
      this.$content = $('#content');

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

      if (this.model.isValid()) {
        this.model.save();
        window.app.navigate('', {trigger: true, replace: true});
      }
    },
    cancel: function () {
      console.log(app);
      window.app.navigate('', {trigger: true, replace: true});
    }
  });

  //EDIT News View
  var EditNewsView = Backbone.View.extend({
    tagName: 'article',
    className: 'editNews',
    initialize: function () {
      this.template = template('editNewsTemplate');
//      this.model.on('invalid', this.validationFails);
      console.log(this.id);
      this.model.collection = this.collection;
      this.collection.listenTo(this.model,'change', this.validationFails);
    },
    events: {
      'click .createBtn': 'editNews',
      'click .cancelBtn': 'cancel'
    },
    render: function () {
      var renderedContent = this.template(this.model.toJSON());
      this.$el.html(renderedContent);
      return this;
    },
    validationFails: function (model, options) {
      model.collection.reset();
    },
    editNews: function (e) {
      this.$title = $('#title');
      this.$date = $('#date');
      this.$brief = $('#brief');
      this.$content = $('#content');

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
      if (this.model.isValid()) {
        this.model.save({},{
          success: function(){
            window.app.navigate('', {trigger: true});
          },
          wait:true
      });
      }
    },
    cancel: function () {
      console.log(app);
      window.app.navigate('', {trigger: true});
    }
  });


  //News Collection
  var NewsCollection = Backbone.Collection.extend({
    url: '/newsCollection',
    model: News
  });

  //News Collection View
  var NewsCollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'newsCollection',
    initialize: function () {
      this.collection.on('add', this.addNews, this);
    },
    render: function () {
      this.$el.empty();
      this.collection.each(function (news) {
        this.addNews(news);
      }, this);
      return this;
    },
    addNews: function (news) {
      var newsView = new NewsShortView({
        model: news
      });
      this.$el.append(newsView.render().el);
    },
    fetchData: function () {
      this.collection.fetch({add: true});
    }
  });




}());