Template.touchpoint.helpers({
  'stage' : function() {
    var touchpoint = Lists.findOne({"_id": Session.get("stage")});
    if(touchpoint) {
      return touchpoint.name;
    }
  },
  'touchpoint' : function() {
    return this._id;
  },
  'touchpoints' : function() {
    var touchpoints = Items.find({"list" : Session.get("stage"), "archive" : {$ne : true}})
    if(touchpoints) {
      return touchpoints;
    }
  },
  'areas' : function() {
    var touchpoint = this._id;
    if(touchpoint) {
      return Areas.find({"archive" : {$ne : true}, "item" : touchpoint}, {sort: {"index": 1}});
    }
  },
  'isActiveTouchPoint' : function(touchpoint) {
    if(Session.get("touchpoint")==this._id) {
      return "active";
    }
  },
});

Template.touchpoint.events({
  'click.touchPointLink':function() {
    Session.set("touchpoint", this._id);
  },
  'click .close' : function(event, template) {
    var overlayElem = $("overlay");
    overlayElem.toggleClass("active");
  },
  'click .color' : function() {
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
  },
  'click .addArea': function(event, template) {
    var area = $('.newAreaName');
    createArea(this, area);
  },
  'keypress input.newAreaName': function (event, template) {
    if (event.which === 13) {
      var area = $('.newAreaName');
      createArea(this, area);
    }
  },
  'click .start-archive': function(event, template) {
    if(!event.isDefaultPrevented()) {
      template.$(".archive-touchpoint").show();
    }
  },
  'click .yes': function(event, template) {
    Items.update({"_id": this._id}, {$set : {"archive": true}});
  },
  'click .no': function(event, template) {
    template.$(".manual-validation").hide();
  },
});

Template.arealistitem.events({
  'click .color' : function() {
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
  },
  'click .start-area-archive': function(event, template) {
    event.preventDefault();
    template.$(".archive-area ").show();
  },
  'click .yes': function(event, template) {
    Areas.update({"_id": this._id}, {$set : {"archive": true}});
  },
  'click .no': function(event, template) {
    template.$(".manual-validation").hide();
  },
});

function createArea(item, comment) {
  check(comment.val(), String);
  var index = Areas.find({"item":item._id}).count();
  Areas.insert({"item": item._id, "name": comment.val(), "index": index+1})
  comment.val("");
}
