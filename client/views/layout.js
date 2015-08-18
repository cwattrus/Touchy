Template.layout.events({
  'click .sidebar-toggle': function() {
      $(".sidebar").addClass("active");
      $(".sidebar").removeClass("bounceOutLeft");
      $(".sidebar").addClass("bounceInLeft");
      $(".sidebar").show();
  },
  'click .flow': function() {

  },
  'click .close-menu': function() {
    closeSidebar();
  },
  'click .new-flow': function() {
    Flows.insert({"name":"New Flow"});
  },
  'click .main-flow': function() {
    closeSidebar();
    Router.go("points");
  },
  'click .new-list-icon': function() {
    var flow = Session.get("flow");
    if(flow) {
      var newIndex = Lists.find({"owner": Meteor.userId(), "flow": flow}).count();
      Lists.insert({"owner": Meteor.userId(),"name": "New Touch Point", "index": newIndex, "flow": flow},
        function() {
          window.scrollTo(document.body.scrollWidth, 0);
          resetWidth();
        }
      );
    }
    else {
      var newIndex = Lists.find({"owner": Meteor.userId(), "flow" : {$exists : false}}).count();
      Lists.insert({"owner": Meteor.userId(),"name": "New Touch Point", "index": newIndex},
        function() {
          window.scrollTo(document.body.scrollWidth, 0);
          resetWidth();
        }
      );
    }
  },
  'click .logout': function() {
    Meteor.logout();
  }
})

function closeSidebar() {
  $(".sidebar").removeClass("active");
  $(".sidebar").removeClass("bounceInLeft");
  $(".sidebar").addClass("bounceOutLeft");
  $(".sidebar").show();
}

Template.layout.helpers({
  'flows': function() {
    return Flows.find({});
  },
  'tiled': function() {
    return Session.get("tiled");
  },
  'isFlowActive': function(flowId) {
    if(Session.get("flow")==flowId) return true;
    else return false;
  }
});

Template.layout.rendered = function() {
  resetWidth();
}

Template.particles.rendered = function() {
  particlesJS.load('particles-js', '/particles.json', function() {
  console.log('callback - particles.js config loaded');
});
}

Template.flow.events({
  'click .flow' : function(event, template) {
    console.log(event.which);
    if(!event.isDefaultPrevented()) {
      closeSidebar();
      Router.go('flow', {_id: this._id});
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

Template.flow.helpers({
  'isFlowActive': function(flowId) {
    if(Session.get("flow")==flowId) return true;
    else return false;
  }
})

function editFlow(flow, flowText) {
  check(flowText, String);
  Flows.update({"_id": flow}, {$set : {"name": flowText}});
}
