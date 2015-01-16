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
      if(relTarg) {
        if(actionTargets.indexOf(relTarg.className)<0) {
          $(".logout-button").hide();
          $(".actions").removeClass("active");
        }
      }
  },

  'click .new-list-icon': function() {
    var newIndex = Lists.find({"owner": Meteor.userId()}).count();
    Lists.insert({"owner": Meteor.userId(),"name": "New Touch Point", "index": newIndex},
      function() {
          window.scrollTo(document.body.scrollWidth, document.body.scrollWidth);
          resetWidth();
      }
    );
  },
  'click .logout-button': function() {
    Meteor.logout();
  }
})

Template.layout.rendered = function() {
  resetWidth();
}
