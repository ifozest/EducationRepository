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