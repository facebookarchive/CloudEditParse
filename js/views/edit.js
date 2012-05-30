App.Views.Edit = Backbone.View.extend({
  events: {
    "submit form": "save"
  },
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.render();
  },
  
  save: function() {
    var self = this;
    var msg = this.model.isNew() ? 'Successfully created!' : "Saved!";

    // Apply an ACL to make it public readable, but only writeable from this client
    var ACL = new Parse.ACL(Parse.User.current());
    ACL.setPublicReadAccess(true);
    
    this.model.save({ title: this.$('[name=title]').val(), body: this.$('[name=body]').val(), ACL: ACL }, {
      success: function(model, resp) {
        new App.Views.Notice({ message: msg });
        Backbone.history.saveLocation('documents/' + model.id);
      },
      error: function() {
        new App.Views.Error();
      }
    });
    
    return false;
  },
  
  render: function() {
    $(this.el).html(_.template($("#document-template").html())({ model: this.model }));
    $('#app').html(this.el);
    
    // use val to fill in title, for security reasons
    this.$('[name=title]').val(this.model.get('title'));
    
    this.delegateEvents();
  }
});
