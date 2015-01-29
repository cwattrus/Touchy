Flows.allow({
  insert: function() {
    return true;
  },
  update: function(userId, doc) {
    // var list = doc;
    // return allowOwner(list, userId);
    return true;
  },
  remove: function() {
    // var list = this;
    // return allowOwner(list);
    return true;
  }
});

Lists.allow({
  insert: function() {
    return true;
  },
  update: function(userId, doc) {
    // var list = doc;
    // return allowOwner(list, userId);
    return true;
  },
  remove: function() {
    // var list = this;
    // return allowOwner(list);
    return true;
  }
});

Areas.allow({
  insert: function() {
    return true;
  },
  update: function(userId, doc) {
    // var list = doc;
    // return allowOwner(list, userId);
    return true;
  },
  remove: function() {
    // var list = this;
    // return allowOwner(list);
    return true;
  }
});

SubAreas.allow({
  insert: function() {
    return true;
  },
  update: function(userId, doc) {
    // var list = doc;
    // return allowOwner(list, userId);
    return true;
  },
  remove: function() {
    // var list = this;
    // return allowOwner(list);
    return true;
  }
});

Items.allow({
  insert: function() {
    return true;
  },
  update: function(userId, doc) {
    // var item = doc;
    // return allowOwnerOrCollaboratorOnList(item, userId);
    return true;
  },
  remove: function(userId) {
    // var item = this;
    // return allowOwnerOrCollaboratorOnList(item, userId);
    return true;
  }
});

Comments.allow({
  insert: function() {
    return true;
  },
  update: function(userId, doc) {
    // var item = doc;
    // return allowOwnerOrCollaboratorOnList(item, userId);
    return true;
  },
  remove: function(userId) {
    // var item = this;
    // return allowOwnerOrCollaboratorOnList(item, userId);
    return true;
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
