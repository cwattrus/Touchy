Template.layout.events({
  'mouseover .new-list-icon': function() {
    $(".logout-button").show();
    $(".actions").addClass("active");
    $(".new-list-popover").show();
  },
  'mouseout .new-list-icon': function() {
    $(".new-list-popover").hide();
  },
  'mouseover .logout-button': function() {
    $(".logout-popover").show();
  },
  'mouseout .logout-button': function() {
    $(".logout-popover").hide();
  },
  'mouseout .actions': function() {
      if (!e) var e = window.event;
	    var relTarg = e.relatedTarget || e.toElement;
      var actionTargets = ["new-list-icon", "actions active", "logout-button icon-lock-1"];
      if(actionTargets.indexOf(relTarg.className)<0) {
          console.dir(relTarg);
          $(".logout-button").hide();
          $(".actions").removeClass("active");
      }
  },

  'click .new-list-icon': function() {
    var newIndex = Lists.find({"owner": Meteor.userId()}).count();
    Lists.insert({"owner": Meteor.userId(),"name": "New Touch Point", "index": newIndex},
      function() {
          window.scrollTo(0,document.body.scrollHeight);
      }
    );
  },
  'click .logout-button': function() {
    Meteor.logout();
  }
})
