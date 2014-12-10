Template.splash.events({
  'click .google' : function() {
    Meteor.loginWithGoogle(function() {
      Router.go("points");
    });

  }
})
