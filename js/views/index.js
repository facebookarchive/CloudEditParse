App.Views.Index = Backbone.View.extend({
    initialize: function() {
      this.render();
    },
    
    render: function() {
      $(this.el).html(_.template($("#document-collection-template").html())({ collection: this.collection }));
      $('#app').html(this.el);
    }
});
