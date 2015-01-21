Template.points.helpers({
  points: function() {
    var flow = Session.get("flow");
    if(flow) {
      return Lists.find({"archive" : {$ne : true}, "flow" : flow}, {sort: {"index": 1}});
    }
    else return Lists.find({"archive" : {$ne : true}, "flow": {$exists : false}}, {sort: {"index": 1}});
  }
});

Template.points.rendered = function() {

}
