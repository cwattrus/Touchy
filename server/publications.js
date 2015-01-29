Meteor.publish('flows', function() {
  return Flows.find({});
});

Meteor.publish('lists', function() {
    return Lists.find({});
});

Meteor.publish('items', function() {
  return Items.find({});
});

Meteor.publish('areas', function() {
  return Areas.find({"archive": {$ne: true}});
});

Meteor.publish('comments', function() {
  return Comments.find({"archive": {$ne: true}});
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
      {fields: {'other': 1, 'things': 1}});
    } else {
      this.ready();
    }
  });
