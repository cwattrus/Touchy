Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(
  function() {
    if (!Meteor.userId()) {
      // this.setLayout("splash");
      Router.go("splash");
    }
    this.next();
  }, {except: ['splash', 'loginConfig']}
);

Router.map(function() {
  this.route('splash', {
    path: '/',
    template: 'splash'
  });
  this.route('points', {
    path: '/points',
    template: 'points',
  });
  this.route('point', {
    path: '/points/:_id',
    template: 'points',
    data: function() {
      return Items.findOne(this.params._id)
    },
  });
  this.route('loginConfig', {
    path: '/login/config',
    template: 'loginConfig'
  });
});
