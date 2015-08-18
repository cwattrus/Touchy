resetWidth = function resetPageWidth() {
  if(Session.get("flow")) {
    var width = 500 * Lists.find({"archive" : {$ne: true}, "flow": Session.get("flow")}).count();
  }
  else var width = 500 * Lists.find({"archive" : {$ne: true}, "flow":{$exists: false}}).count();
  $(".page").width(width.toString() + "px");
}

enableSorting = function createSortable(el) {
  var sortable = new Sortable(el, {
    group: "stages",
    sort: true,  // sorting inside list
    animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation

    draggable: ".item",  // Specifies which items inside the element should be sortable

    // dragging ended
    onEnd: function (/**Event*/evt) {
      evt.oldIndex;  // element's old index within parent
      evt.newIndex;  // element's new index within parent

      if(evt.item.parentElement!=null) {
        $("#" + $(evt.item.parentElement).attr("id") + " li").each(
          function(index) {
            Items.update({"_id":$(this).attr("id")}, {$set: {"index": index, "list":$(evt.item.parentElement).attr("id")}});
          }
        )
      }
      else {
        $("#" +  $("#" + evt.item.id).parent().attr("id") + " li").each(
          function(index) {
            Items.update({"_id":$(this).attr("id")}, {$set: {"index": index,  "list":$(evt.item.parentElement).attr("id")}});
          }
        )
      }

    },

    // Changed sorting within list
    onUpdate: function (/**Event*/evt) {
      var itemEl = evt.item;  // dragged HTMLElement
      evt.oldIndex;  // element's old index within parent
      evt.newIndex;  // element's new index within parent
      if(evt.srcElement) {
        var oldIndexItem = Items.findOne({"list": evt.srcElement.id, "index": evt.newIndex});

        if(oldIndexItem) {
          $("#" + event.srcElement.id + " li").each(
            function(index) {
              Items.update({"_id":$(this).attr("id")}, {$set: {"index": index}});
            }
          )
        }
      }  

    },
    onFilter: function (/**Event*/evt) {
      var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
    }
  });
}
