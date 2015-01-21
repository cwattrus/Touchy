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
  console.log(Areas.find({"archive": {$ne: true}}).fetch());
  return Areas.find({"archive": {$ne: true}});
});

Meteor.publish('comments', function() {
  return Comments.find({"archive": {$ne: true}});
});
