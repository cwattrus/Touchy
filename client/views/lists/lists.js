Template.points.helpers({
  points: function() {
    return Lists.find({"archive" : {$ne : true}}, {sort: {"index": 1}});
  }
});

Template.points.rendered = function() {

}
