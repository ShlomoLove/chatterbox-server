let fs = require('fs');
let url = require('url');
let Messages = require('./messages');
let { getReqBody, findMimeType, sendResponse } = require('./utils');

let chatterboxMessagesAPI = (req, res) => {
  if (req.method === 'POST') {
    getReqBody(req, body => {
      let resBody = JSON.stringify(Messages.storeNewMessage(body));
      return sendResponse(201, 'application/json', resBody, res);
    });
  } else if (req.method === 'GET') {
    let resBody = {
      results: Messages.messages
    };
    return sendResponse(200, 'application/json', JSON.stringify(resBody), res);
  }
};

let requestHandler = (req, res) => {
  let urlObject = url.parse(req.url);
  if (req.method === 'OPTIONS') {
    return sendResponse(200, 'text/plain', '', res);
  }
  if (urlObject.pathname === '/chatterbox/classes/messages') {
    return chatterboxMessagesAPI(req, res);
  }
  if (urlObject.pathname === '/') {
    urlObject.pathname = '/index.html';
  }
  fs.readFile('.' + urlObject.pathname, function(err, file) {
    if (err) {
      return sendResponse(404, 'text/plain', 'File not found', res);
    } else {
      let fileExtension = urlObject.pathname.split('.')[1];
      let mimeType = findMimeType(fileExtension);
      return sendResponse(200, mimeType, file, res);
    }
  });
};

module.exports.requestHandler = requestHandler;

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
