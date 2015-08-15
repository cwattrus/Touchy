Template.itemExpanded.events({
  'click .touch-point-container': function(event) {
    event.preventDefault();
  },
  'click .overlay': function(event, template) {
    if(!event.isDefaultPrevented()) {
      var overlay = $(template.find('.overlay'));
      overlay.toggleClass("active");
      Router.go("points");
    }
  },
  'click .archive': function(event, template) {
    Items.update({"_id": this._id}, {$set : {"archive": true}});
    var overlay = $(template.find('.overlay'));
    overlay.toggleClass("active");
    Router.go("points");
  },
  'keyup .item-edit': function(event, template) {
    var item = $(template.find('.item-edit'));
    editItem(this, item);
  },
});


function editArea(area, areaElement) {
  var areaText = areaElement.val();
  check(areaText, String);
  Areas.update({"_id": area._id}, {$set : {"name": areaText}});
}

function editItem(item, itemElement) {
  var itemText = itemElement.val();
  check(itemText, String);
  Items.update({"_id": item._id}, {$set : {"name": itemText}});
}

function createArea(item, comment) {
  var commentText = comment.val();
  check(commentText, String);
  Areas.insert({"item": item._id, "name": commentText})
  comment.val("");
}
