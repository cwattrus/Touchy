Meteor.smartPublish('lists', function() {
  return [
    Lists.find({"owner": this.userId}),
    Lists.find({"collaborators": {$in :[this.userId]}})
  ];
});

Meteor.publish('items', function() {
  var ownedLists = Lists.find({"owner":this.userId}).fetch();
  var index;

  for (index = 0; index < ownedLists.length; ++index) {
      ownedLists[index] = ownedLists[index]._id;
      console.log("Owned list found");
  }

  var sharedLists = Lists.find({"collaborators": {$in :[this.userId]}}).fetch();
  var index;

  for (index = 0; index < sharedLists.length; ++index) {
      sharedLists[index] = sharedLists[index]._id;
      console.log("Shared list found");
  }

  return Items.find({$or: [{"list": {$in : ownedLists}}, {"list": {$in : sharedLists}}]});
  //
  // return [
  //   Items.find({"list": {$in :ownedLists}}),
  //   Items.find({"list": {$in :sharedLists}})
  // ];
});

Meteor.publish('comments', function() {
  return Comments.find({});
});
