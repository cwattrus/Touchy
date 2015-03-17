resetWidth = function resetPageWidth() {
  var width = 500 * Lists.find({"archive" : {$ne: true}}).count();
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
      console.dir(evt.item.parentElement.id);
      console.dir(evt.item.id);
      // var oldIndexItem = Items.findOne({"list": evt.item.parentElement.id, "index": evt.newIndex});
      Items.update({"_id":evt.item.id}, {$set: {"list": evt.item.parentElement.id, "index": evt.newIndex}});
      // Items.update({"_id":oldIndexItem._id}, {$set: {"index": evt.oldIndex}});
    },

    // Changed sorting within list
    onUpdate: function (/**Event*/evt) {
      var itemEl = evt.item;  // dragged HTMLElement
      evt.oldIndex;  // element's old index within parent
      evt.newIndex;  // element's new index within parent



      var oldIndexItem = Items.findOne({"list": evt.srcElement.parentElement.id, "index": evt.newIndex});
      Items.update({"_id":oldIndexItem._id}, {$set: {"index": evt.oldIndex}});
      Items.update({"_id":evt.item.id}, {$set: {"index": evt.newIndex}});
    },

    // Called by any change to the list (add / update / remove)
    onSort: function (/**Event*/evt) {
      // same properties as onUpdate
      // console.log(evt);
    },

    // Element is removed from the list into another list
    onRemove: function (/**Event*/evt) {
      // var some = [];
      // var index = 0;
      //
      // $(sortable.el.id + ' li').each(function () {
      //   some.push($(this).attr("id"));
      //   index = index + 1;
      //   Items.update({"_id":$(this).attr("id")}, {$set: {"index": index}});
      // });

    },

    onFilter: function (/**Event*/evt) {
      var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
    }
  });
}

sortList = function() {
  // Start priority at 0
  var prettyPriority = 0;
  // Prioritise issues with priority first
  var sortedPrioritisedItems = Items.find( { "list": this._id, "index": {$ne: null}, "archive" : {$ne : true}}, { sort:  {'index': 1 }} );
  sortedPrioritisedItems.forEach(function(item) {
    console.dir(item);
    check(item, Object);

    Items.update({_id: item._id}, {$set: {"index":prettyPriority}});
    prettyPriority++;
  });
  // Prioritise new issues last
  var sortedUnprioritisedItems = Items.find( { "list": this._id, index: null}, { sort:  {'index': 1 }} );
  sortedUnprioritisedItems.forEach(function(item) {
    console.log(item._id);
    Items.update({_id: item._id}, {$set: {"index":prettyPriority}});
    prettyPriority++;
  });
}
