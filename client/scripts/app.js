var App = {
  $spinner: $('.spinner img'),
  lastId: '',
  currData: '',
  currRoom: '',
  username: 'anonymous',

  initialize: function() {
    // initialize event handlers and other functions
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    App.startSpinner();
    App.fetch(App.stopSpinner);
    setInterval(App.fetch(), 60000);
  },

  fetch: function(callback = () => {}) {
    // Parse and receives data from server - followed by CB
    console.log('fetching');
    Parse.readAll(({ results }) => {
      App.currData = results;
      console.log(results);
      var messages = [];
      App.currRoom = _.filter(results, function(message) {
        return message.roomname === RoomsView.currRoomName;
      });
      for (var k = 0; k < 9; k++) {
        var currentMsg = App.currRoom[k];
        if (App.currRoom.length === 0) {
          alert('No Previous Msg');
          break;
        } else if (!currentMsg) {
          break;
        } else if (App.lastId === currentMsg.objectId) {
          k = 9;
        }
        messages.push(currentMsg);
      }
      for (var i = messages.length - 1; i >= 0; i--) {
        var message = messages[i];
        console.log('message on fetch', message);
        App.lastId = message.objectId;
        MessagesView.renderMessage(message);
      }
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
