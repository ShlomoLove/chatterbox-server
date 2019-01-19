var FormView = {
  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // event to happen when submit is clicked on
    event.preventDefault(); // creates message object to be sent to the server
    var newMsg = $('#message').val();
    var messageObj = {
      username: App.username,
      text: newMsg,
      roomname: RoomsView.currRoomName
    };
    Parse.create(messageObj, App.fetch());
    $('#message').val('');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }
};
