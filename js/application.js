var App = {
    Views: {},
    Controllers: {},
    Collections: {},
    init: function() {
      Parse.initialize("3M78w88flc5IVxCQrPdafuz1eRAekutjqUaniSaJ", "MfXnXNXhvpe3eBvfSnhypqLkfDBKeQM8ZCdun3e6");

      var start = function() {
        new App.Controllers.Documents();
        Backbone.history.start();
      }

      // Ensure that we create a user for the client
      if (!Parse.User.current()) {
        // Since there is no login view, we just generate a username and password
        var username = Math.random().toString(36).substring(7);
        var password = Math.random().toString(36).substring(7);

        // Sign them up and secure the user
        Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
          success: function(user) {
            start();
          }
        });
      } else {
        start();
      }
    }
};
