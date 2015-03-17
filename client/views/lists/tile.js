Template.tile.rendered = function() {
    Deps.autorun(function () {
      $("input").autosizeInput();

    });
    var el = document.getElementById(this.data._id);
    enableSorting(el);
}

Template.tile.events({
  'keyup .name': function(event, template) {
      check(template.find(".name").value, String);

      Lists.update({"_id":this._id}, {$set: {"name": template.find(".name").value}});
  },
  'click .new-item-icon': function(event, template) {
    newItem(this._id, template.find(".new-item").value);
    clearInput(template.find(".new-item"));
  },
  'keypress input.new-item': function (event, template) {
    if (event.which === 13) {
      newItem(this._id, template.find(".new-item").value);
      clearInput(template.find(".new-item"));
    }
  },
  'click .menu-toggle' : function(event, template) {
     toggleMenu(template.find(".menu"), template.find(".menu-toggle"))
  },
  'click .archive':function(event, template) {
    archiveList(this._id);
    toggleMenu(template.find(".menu"), template.find(".menu-toggle"));
    resetWidth();
  },
  // 'click .incognito': function(event, template) {
  //   toggleIncognito(this);
  //   toggleMenu(template.find(".menu"), template.find(".menu-toggle"))
  // },
  // 'click .unlock-step-1': function(event, template) {
  //   toggleLock(template);
  //   toggleMenu(template.find(".menu"), template.find(".menu-toggle"))
  // },
  // 'click .share': function(event, template) {
  //   $(template.find(".sharing-pane")).toggleClass("hidden");
  //   toggleMenu(template.find(".menu"), template.find(".menu-toggle"));
  // },
  // 'click .toggle-share': function(event, template) {
  //   $(template.find(".sharing-pane")).toggleClass("hidden");
  // },
  // 'click .invite-collaborator': function(event, template) {
  //   var collaboratorEmail = $(template.find(".collaborator-email")).val();
  //   Meteor.call("addCollaborator", this._id, collaboratorEmail);
  //   $(template.find(".sharing-pane")).toggleClass("hidden");
  // }
})

function toggleMenu(elem, menuIcon) {
  var menuElem = $(elem);
  menuElem.toggle();
  var menuIconElem = $(menuIcon);
  menuIconElem.toggleClass("close");
}

Template.item.events({
  'click .item': function(event, template) {
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
          Items.update({"_id": this._id}, {$set : {"color": color}});
        }
        else {
          color = "red";
          Items.update({"_id": this._id}, {$set : {"color": color}});
        }
    }
  },
  'click .expand': function(event, template) {
    event.preventDefault();
    Session.set("stage", this.list);
    Session.set("touchpoint", this._id);
    Router.go("point", {_id:this._id});
    var overlayElem = $("overlay");
    overlayElem.toggleClass("active");
  },
})

Template.tile.helpers({
  'items': function() {
    sortList();
    return Items.find({"list":this._id, "archive": {$ne: true}}, { sort : { "index" : 1 } });
  },
  'incognito_state': function() {
    if(this.incognito) return 'incognito';
  },
  'listColor': function() {
    if(this.owner!=Meteor.userId()) return "shared-list";
  },
  'owner':function() {
    if(this.owner==Meteor.userId()) return true;
    return false;
  },
  'empty':function() {
    if(Items.find({"list":this._id, "archive": {$ne: true}}).fetch().length==0) return true;
    return false;
  }
});

Template.menu.helpers({
  'owner':function() {
    if(this.owner==Meteor.userId()) return true;
    return false;
  },
  'collaborator': function() {
    if(this.owner==Meteor.userId()) return false;
    return true;
  }
});

function newItem(listId, itemValue) {
  check(listId, String);
  check(itemValue, String);
  var newItemIndex = Items.find({"list":listId}).count();
  if (itemValue.length>0) Items.insert({"owner": Meteor.userId(), "list":listId, "name": itemValue, "index":newItemIndex});
}

function archiveList(listId) {
  check(listId, String);
  if(listId&&(Lists.findOne({"_id":listId}))) {
      Lists.update({"_id": listId}, {$set : {"archive": true}});
  }
}

function toggleIncognito(list) {
  check(list, Object);
  if(list.incognito) {
    Lists.update({"_id": list._id}, {$set : {"incognito": false}});
  }
  else {
    Lists.update({"_id": list._id}, {$set : {"incognito": true}});
  }
}

function toggleLock(template) {
  var lockElem = $(template.find(".lock"));
  lockElem.toggle();
}

function clearInput(input) {
  input.value = "";
}
