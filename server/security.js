Lists.allow({
  insert: function() {
    return true;
  },
  update: function(userId, doc) {
    var list = doc;
    return allowOwner(list, userId);
  },
  remove: function() {
    var list = this;
    return allowOwner(list);
  }
});

Items.allow({
  insert: function() {
    return true;
  },
  update: function(userId, doc) {
    var item = doc;
    return allowOwnerOrCollaboratorOnList(item, userId);
  },
  remove: function(userId) {
    var item = this;
    return allowOwnerOrCollaboratorOnList(item, userId);
  }
});

Comments.allow({
  insert: function() {
    return true;
  },
  update: function(userId, doc) {
    var item = doc;
    return allowOwner(item, userId);
  },
  remove: function() {
    var item = this;
    return allowOwner(item);
  }
});


function allowOwner(doc, userId) {
  if(Meteor.user()._id==doc.owner) {
    return true;
  }
  else return false;
}
function allowOwnerOrCollaboratorOnList(doc, userId) {
  if(Meteor.user()._id==doc.owner) {
    return true;
  }
  else if(doc.list) {
      var list = Lists.findOne({"_id":doc.list});
      if((list.collaborators.indexOf(userId)>-1)||(list.owner==userId)) {
          return true;
      }
  }
  return false;
}
