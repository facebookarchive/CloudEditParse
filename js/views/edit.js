App.Views.Edit = Backbone.View.extend({
  events: {
    "submit form": "save"
  },
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.editable = this.model.getACL().getWriteAccess(Parse.User.current().id);
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
        Backbone.history.navigate('documents/' + model.id);
      },
      error: function(model, error) {
        if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
          new App.Views.Notice({ message: "You don't have permission to edit this document!" });
        } else {
          new App.Views.Error();
        }
      }
    });
    
    return false;
  },
  
  render: function() {
    $(this.el).html(_.template($("#document-template").html())({ model: this.model, editable: this.editable }));
    $('#app').html(this.el);

    if (!this.editable) {
      this.$("input").attr("disabled", "disabled");
      this.$("textarea").attr("disabled", "disabled");
    }
    
    // use val to fill in title, for security reasons
    this.$('[name=title]').val(this.model.get('title'));
    
    this.delegateEvents();
  }
});
