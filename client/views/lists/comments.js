Template.comments.helpers({
  "comments": function() {
    return Comments.find({"item": this._id});
  }
});

Template.comments.events({
  'click .archive-comment': function(event, template) {
    event.preventDefault();
    Comments.update({"_id": this._id}, {$set : {"archive": true}});
  },
});

Template.comment.helpers({
  'comment': function() {
    var text = this.name;
    return linkfy(text);
  }
})
