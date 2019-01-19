var Friends = {
  friendList: {},
  toggleStatus: function(friendName) {
    // setting friend status as object and its value as boolean
    if (!Friends.friendList.hasOwnProperty(friendName)) {
      Friends.friendList[friendName] = true;
    } else if (this.friendList[friendName] === false) {
      Friends.friendList[friendName] = true;
    } else if (this.friendList[friendName] === true) {
      Friends.friendList[friendName] = false;
    }
    Friends.updateFriendList(friendName);
  },
  updateFriendList: function(friendName) {
    // checks above status and adds or removes class for highlight

    for (var i = 0; i < App.currRoom.length; i++) {
      var clickedOnName = App.currRoom[i].username;
      if (Friends.friendList[clickedOnName] === true) {
        $('.' + friendName).addClass('friend');
      } else if (
        Friends.friendList[clickedOnName] === false &&
        $('.' + friendName).hasClass('friend')
      ) {
        $('.' + friendName).removeClass('friend');
      }
    }
  }
};
