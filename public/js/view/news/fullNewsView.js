

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