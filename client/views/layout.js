Template.layout.events({
  'click .menu': function() {
      $(".sidebar").addClass("active");
      $(".sidebar").removeClass("bounceOutLeft");
      $(".sidebar").addClass("bounceInLeft");
      $(".sidebar").show();
  },
  'click .close-menu': function() {
    $(".sidebar").removeClass("active");
    $(".sidebar").removeClass("bounceInLeft");
    $(".sidebar").addClass("bounceOutLeft");
    $(".sidebar").show();
  },
  'click .new-flow': function() {
    Flows.insert({"name":"New Flow"});
  },
  'click .main-flow': function() {
    Session.set("flow", null);
  },
  'click .new-list-icon': function() {
    var flow = Session.get("flow");
    if(flow) {
      var newIndex = Lists.find({"owner": Meteor.userId(), "flow": flow}).count();
      Lists.insert({"owner": Meteor.userId(),"name": "New Touch Point", "index": newIndex, "flow": flow},
        function() {
          window.scrollTo(document.body.scrollWidth, document.body.scrollWidth);
          resetWidth();
        }
      );
    }
    else {
      var newIndex = Lists.find({"owner": Meteor.userId(), "flow" : {$exists : false}}).count();
      Lists.insert({"owner": Meteor.userId(),"name": "New Touch Point", "index": newIndex},
        function() {
          window.scrollTo(document.body.scrollWidth, document.body.scrollWidth);
          resetWidth();
        }
      );
    }


  },
  'click .logout-button': function() {
    Meteor.logout();
  }
})

Template.layout.helpers({
  'flows': function() {
    return Flows.find({});
  }
})

Template.layout.rendered = function() {
  resetWidth();
}

Template.flow.events({
  'click .flow' : function(event, template) {
    if(!event.isDefaultPrevented()) {
      Session.set("flow", this._id);
    }
  },
  'click .editFlowName' : function(event, template) {
    event.preventDefault();
  },
  'keyup .editFlowName': function(event, template) {
    var flowText = $(template.find('.editFlowName'));
    editFlow(this._id, flowText.val());
  },
});

function editFlow(flow, flowText) {
  check(flowText, String);
  Flows.update({"_id": flow}, {$set : {"name": flowText}});
}
