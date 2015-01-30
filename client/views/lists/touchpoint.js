Template.touchpoint.helpers({
  'stage' : function() {
    var touchpoint = Lists.findOne({"_id": Session.get("stage")});
    if(touchpoint) {
      return touchpoint.name;
    }
  },
  'touchpoint' : function() {
    var touchpoint = Items.findOne({"_id": Session.get("touchpoint")});
    if(touchpoint) {
      return touchpoint.name;
    }
  },
  'touchpoints' : function() {
    var touchpoints = Items.find({"list" : Session.get("stage")})
    if(touchpoints) {
      return touchpoints;
    }
  },
  'areas' : function() {
    var touchpoint = Session.get("touchpoint");
    if(touchpoint) {
      return Areas.find({"archive" : {$ne : true}, "item" : touchpoint}, {sort: {"index": 1}});
    }
  },
  'isActiveTouchPoint' : function(touchpoint) {
    console.log(this);
    // console.log(touchpoint.name);
    // console.log(touchpoint);
    // if(touchpoint==this._id) {
    //   return true;
    // }
    // return false;
  }
});

Template.touchpoint.events({
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
    var area = $('.newAreaName').val();
    console.log(area);
    createArea(this, area);
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
  }
});

function createArea(item, comment) {
  check(comment, String);
  Areas.insert({"item": item._id, "name": comment})
  comment.val("");
}
