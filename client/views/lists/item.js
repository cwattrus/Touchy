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
  },
  'keyup .item-edit': function(event, template) {
    var item = $(template.find('.item-edit'));
    editItem(this, item);
  },
});

Template.area.events({
  'keyup .area-text': function(event, template) {
    var area = $(template.find('.area-text'));
    editArea(this, area);
    console.dir("HEllo");
  },
});

Template.areas.events({
  'click .post-area': function(event, template) {
    var area = $(template.find('.new-area-text'));
    createArea(this, area);
  },
  'click .archive-area': function(event, template) {
    event.preventDefault();
    Areas.update({"_id": this._id}, {$set : {"archive": true}});
  },
  'keyup .new-area-text': function(event, template) {
    if (event.which === 13) {
      var area = $(template.find('.new-area-text'));
      createArea(this, area);
    }
  },
  'click .area-text': function(event, template) {
    event.preventDefault();
  },
  'click .area': function(event, template) {
    if(!event.isDefaultPrevented()) {
      var colors = ["red", "orange", "yellow", "blue", "green", "white", ];
      var color = this.color;
      if(color) {
        var currentColorIndex = colors.indexOf(color);
        if(currentColorIndex<5){
          newColorIndex = currentColorIndex + 1;
        }
        else {
          newColorIndex = 0;
        }
        color = colors[newColorIndex];
        Areas.update({"_id": this._id}, {$set : {"color": color}});
      }
      else {
        color = "red";
        Areas.update({"_id": this._id}, {$set : {"color": color}});
      }
    }
  },
})

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

Template.areas.helpers({
  "areas": function() {
    return Areas.find({"item": this._id});
  }
});

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
