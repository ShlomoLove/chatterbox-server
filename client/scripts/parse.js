var Parse = {
  server: 'http://localhost:4000/chatterbox/classes/messages',

  create: function(message) {
    // todo: save a message to the server
    return $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      crossDomain: true
    });
  },

  readAll: function() {
    return $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      crossDomain: true
    });
  },

  readRoom: function(roomname) {
    if (roomname === 'All Rooms') {
      return Parse.readAll();
    }
    if (roomname === 'New Room...') {
      return -1;
    }
    return $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt', where: { roomname } },
      contentType: 'application/json',
      crossDomain: true
    });
  }
};
