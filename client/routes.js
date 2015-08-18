Router.configure({
  // layoutTemplate: 'layout',
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
  layoutTemplate: 'layout',
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
  layoutTemplate: 'layout',
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
    this.render('points');
    this.render('nothing', {
       to: 'touchpointContainer',
       data: function () { return Items.findOne(this.params._id)}
     });
  }
});

Router.route('/points/:_id', {
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('lists');
  },
  waitOn: function () {
    return Meteor.subscribe('lists');
  },
  data: function() {
    Session.set("touchpoint", this.params._id);
    return Items.findOne(this.params._id)
  },
  onBeforeAction: function() {
    resetWidth();
    this.next();
  },
  name: "point",
  action: function () {
    this.render('touchpoint', {
       to: 'touchpointContainer',
       data: function () { return Items.findOne(this.params._id)}
     });
    Session.set("touchpoint", this.params._id);
    this.render('points');
  }
});

Router.map(function() {
  this.route('splash', {
    path: '/',
    template: 'splash',
  });

  this.route('loginConfig', {
    path: '/login/config',
    template: 'loginConfig'
  });
});
