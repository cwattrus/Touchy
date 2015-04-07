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

Template.item.rendered = function() {

  createSortable();
}

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

Template.comments.helpers({
  "comments": function() {
    return Comments.find({"item": this._id});
  }
});

Template.comments.events({
  'click .post-comment': function(event, template) {
    var comment = $(template.find('.new-comment-text'));
    createComment(this, comment);
  },
  'click .archive-comment': function(event, template) {
    event.preventDefault();
    Comments.update({"_id": this._id}, {$set : {"archive": true}});
  },
  'keyup .new-comment-text': function(event, template) {
    if (event.which === 13) {
      var comment = $(template.find('.new-comment-text'));
      createComment(this, comment);
    }
  },
  'click .new-comment-text': function(event, template) {
    event.preventDefault();
  }
});

Template.comment.events({
  'keyup .comment-text': function(event, template) {
    var comment = $(template.find('.comment-text'));
    editComment(this, comment);
  },
});


function editComment(comment, commentElement) {
  var commentText = commentElement.val();
  check(commentText, String);
  Areas.update({"_id": comment._id}, {$set : {"name": commentText}});
}

function createComment(item, comment) {
  var commentText = comment.val();
  check(commentText, String);
  Comments.insert({"item": item._id, "name": commentText, "person": Meteor.user().profile.name })
  comment.val("");
}
