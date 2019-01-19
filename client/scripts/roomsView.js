var RoomsView = {
  $addRoom: $('#rooms .addRoomButton'),
  $go: $('#rooms .goButton'),
  $select: $('#rooms select'),
  $roomName: $('#rooms #roomName'),
  $option: $('#rooms .option'),
  currRoomName: 'lobby',

  initialize: function() {
    RoomsView.renderRoom(RoomsView.currRoomName);
    console.log(RoomsView.currRoomName);

    RoomsView.$addRoom.on('click', function(event) {
      // start up new room and add room

      var roomName = RoomsView.$roomName;
      RoomsView.renderRoom(roomName.val());
      roomName.val('');
    });

    RoomsView.$go.on('click', function(event) {
      // empties curr chatroom & repopulates with filtered messages
      RoomsView.currRoomName = $('#option :selected')
        .text()
        .trim();
      console.log();
      MessagesView.$chats.empty();
      App.lastId = '';
      App.fetch();
      // var currFriends = _.filter(Friends.friendList, function(friend) {
      //   for (var key in friend) {
      //     return friend[key] === true;
      //   }
      // });
      // console.log(currFriends);
      // var currFriendNames = _.map(currFriends, function(friend) {
      //   for (var key in friend) {
      //     return key;
      //   }
      // });
      // console.log(currFriendNames);
      // for (var i = 0; currFriendNames.length; i++) {
      //   Friends.updateFriendList(currFriendNames[i]);
      // }
    });
  },
  renderRoom: function(name) {
    var $room = `<option class = 'option' value = ${name}> ${name} </option>`;
    Rooms.add($room);
  }
};
