Meteor.subscribe("lists", function() {
  if(typeof resetWidth != 'undefined') {
    resetWidth();
  };
});
Meteor.subscribe("items");
Meteor.subscribe("comments");
Meteor.subscribe("shared");
