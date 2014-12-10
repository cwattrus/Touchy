resetWidth = function resetPageWidth() {
  var width = 500 * Lists.find({"archive" : {$ne: true}}).count();
  $(".page").width(width.toString() + "px");
}

enableSorting = function createSortable(el) {
  var sortable = new Sortable(el, {
    group: "stages",
    sort: true,  // sorting inside list
    animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
    // filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
    draggable: ".item",  // Specifies which items inside the element should be sortable


    // dragging ended
    onEnd: function (/**Event*/evt) {
      evt.oldIndex;  // element's old index within parent

      evt.newIndex;  // element's new index within parent

    },

    // Changed sorting within list
    onUpdate: function (/**Event*/evt) {
      var itemEl = evt.item;  // dragged HTMLElement
      // var el = sortable.closest(evt); // list item
      evt.oldIndex;  // element's old index within parent

      evt.newIndex;  // element's new index within parent

      var oldIndexItem = Items.findOne({"list": evt.srcElement.parentElement.id, "index": evt.newIndex});
      Items.update({"_id":oldIndexItem._id}, {$set: {"index": evt.oldIndex}});
      Items.update({"_id":evt.item.id}, {$set: {"index": evt.newIndex}});

      // + indexes from onEnd
    },

    // Called by any change to the list (add / update / remove)
    onSort: function (/**Event*/evt) {
      // same properties as onUpdate
      // console.log(evt);

    },

    // Element is removed from the list into another list
    onRemove: function (/**Event*/evt) {
      var some = [];
      var index = 0;

      $(sortable.el.id + ' li').each(function () {
        some.push($(this).attr("id"));
        index = index + 1;
        Items.update({"_id":$(this).attr("id")}, {$set: {"index": index}});
      });

    },

    onFilter: function (/**Event*/evt) {
      var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
    }
  });
}
