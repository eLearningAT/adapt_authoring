require([
    'coreJS/app/origin',
    'coreJS/app/router',
    'coreJS/user/models/sessionModel',
    'coreJS/navigation/views/navigationView',
    'coreJS/app/helpers',
    'polyglot',
    'templates'
], function (Origin, Router, SessionModel, NavigationView, Helpers, Polyglot) {
  var locale = localStorage.getItem('lang') || 'en';
  // Get the language file
  $.getJSON('lang/' + locale, function(data) {
    // Instantiate Polyglot with phrases
    window.polyglot = new Polyglot({phrases: data});

    Origin.sessionModel = new SessionModel();

    Origin.router = new Router();

    Origin.sessionModel.fetch({
      success: function(data) {
        $('#app').before(new NavigationView({model: Origin.sessionModel}).$el);
        Origin.initialize();
      }
    });
  });    
});
