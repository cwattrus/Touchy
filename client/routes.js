Router.configure({
  layoutTemplate: 'layout',
  progressSpinner : false
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
    onBeforeAction: function() {
      Session.set("flow", undefined);
      resetWidth();
      this.next();
    }
  });
  this.route('flow', {
    path: '/flow/:_id',
    template: 'points',
    data: function() {
      Session.set("flow", this.params._id);
      resetWidth();
      return Lists.findOne({"flow":this.params._id});
    },
  });
  this.route('point', {
    path: '/points/:_id',
    template: 'points',
    data: function() {
      Session.set("touchpoint", this.params._id);
      return Items.findOne(this.params._id)
    },
  });
  this.route('loginConfig', {
    path: '/login/config',
    template: 'loginConfig'
  });
});
