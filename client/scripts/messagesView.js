var MessagesView = {
  $chats: $('#chats'),

  initialize: function() {
    $userName = $('div');
    $submitButton = $('submit');

    $('div').on('click', function(event) {
      // retrieving classname for verification of clicked item and using its text for username
      if (event.target.className.includes('username')) {
        var friendName = event.target.innerText;
        Friends.toggleStatus(friendName);
      }
    });
  },

  renderMessage: function(message) {
    // creating a DOM ready message as value with its roomname as key inside obj
    var template = `
    <div class="chat">
      <div class="username ${_.escape(message.username)}">${_.escape(
  message.username
)}</div>
      <div class="text">${_.escape(message.text)}</div>
    </div>
    `;

    MessagesView.$chats.prepend(template);

    Messages[message.roomname] === undefined
      ? (Messages[message.roomname] = [template.roomname])
      : Messages[message.roomname].push(template.roomname);
  }
};
