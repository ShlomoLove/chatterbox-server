let Messages = {
  messages: [],
  idCount: 0,
  storeNewMessage: body => {
    //storing new message
    body.objectId = Messages.idCount;
    Messages.idCount++;
    body.createdAt = new Date();
    Messages.messages.push(body);
    let resBody = {
      createdAt: body.createdAt,
      objectId: body.objectId
    };
    return resBody;
  }
};

module.exports = Messages;
