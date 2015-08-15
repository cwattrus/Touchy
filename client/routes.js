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


Router.route('/flow/:_id', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('lists');
  },
  waitOn: function () {
    return Meteor.subscribe('lists', {"flow": this.params._id});
  },
  data: function () {
    return Lists.findOne({"flow":this.params._id});
  },
  onAfterAction: function() {
    resetWidth();
  },
  name: "flow",
  action: function () {
    Session.set("flow", this.params._id);
    this.render('points');
  }
});

Router.route('/points', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('lists');
  },
  waitOn: function () {
    return Meteor.subscribe('lists');
  },
  onAfterAction: function() {
    resetWidth();
  },
  name: "points",
  action: function () {
    Session.set("flow", undefined);
    this.render('points');
  }
});


Router.map(function() {
  this.route('splash', {
    path: '/',
    template: 'splash'
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
