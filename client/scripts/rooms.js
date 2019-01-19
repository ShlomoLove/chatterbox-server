//MVC Model
var Rooms = {
  add: function($room) {
    var dropDown = RoomsView.$select;
    $(dropDown).append($room);
  }
};
