App.Controllers.Documents = Backbone.Controller.extend({
  routes: {
    "documents/:id":            "edit",
    "":                         "index",
    "new":                      "newDoc"
  },
  
  edit: function(id) {
    var doc = new Document({ objectId: id });
    doc.fetch({
      success: function(model, resp) {
        new App.Views.Edit({ model: doc });
      },
      error: function() {
        new Error({ message: 'Could not find that document.' });
        window.location.hash = '#';
      }
    });
  },
  
  index: function() {
    var query = new Parse.Query(Document);
    query.limit(50);
    query.descending("createdAt");
    var documents = query.collection();
    
    documents.fetch({
      success: function() {
        new App.Views.Index({ collection: documents });
      },
      error: function() {
        new Error({ message: "Error loading documents." });
      }
    });
  },
  
  newDoc: function() {
    new App.Views.Edit({ model: new Document() });
  }
});
