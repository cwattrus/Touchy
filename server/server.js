Meteor.methods({
  "addCollaborator": function(listId, collaboratorEmail) {
    var user = Meteor.users.findOne({"services.google.email": collaboratorEmail});
    check(user, Object);
    Lists.update({"_id":listId}, {$push : {"collaborators": user._id}});
  }
})
