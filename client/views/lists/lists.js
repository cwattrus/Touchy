Template.points.helpers({
  points: function() {
    return Lists.find({"archive" : {$ne : true}}, {sort: {"index": 1}});
  }
});
