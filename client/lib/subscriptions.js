Meteor.subscribe("lists", function() {
  if(typeof resetWidth != 'undefined') {
    resetWidth();
  };
});
Meteor.subscribe("flows");
Meteor.subscribe("items");
Meteor.subscribe("areas");
Meteor.subscribe("subareas")
Meteor.subscribe("shared");
