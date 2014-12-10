Template.itemExpanded.events({
  'click .touch-point-container': function(event) {
    // console.dir(event);
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
  }
})

Template.comments.events({
  'click .post-comment': function(event, template) {
    var comment = $(template.find('.new-comment-text'));
    postComment(this, comment);
  },
  'keyup .new-comment-text': function(event, template) {
    if (event.which === 13) {
      var comment = $(template.find('.new-comment-text'));
      postComment(this, comment);
    }
  },

})

function postComment(item, comment) {
  var commentText = comment.val();
  check(commentText, String);
  Comments.insert({"item": item._id, "comment": commentText})
  comment.val("");
}

Template.comments.helpers({
  "comments": function() {
    return Comments.find({"item": this._id});
  }
});
