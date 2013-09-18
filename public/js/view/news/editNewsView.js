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

