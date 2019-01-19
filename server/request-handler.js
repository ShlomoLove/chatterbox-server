var fs = require('fs');
var url = require('url');
var Messages = require('./messages');
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
var defaultCorsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var mimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css',
  gif: 'image/gif'
};

let responses = {
  POST: (req, res) => {
    let body = [];
    req
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString());
        body.objectId = Messages.idCount;
        Messages.idCount++;
        body.createdAt = new Date();
        Messages.messages.push(body);
        console.log(Messages.messages);
        let resBody = {
          createdAt: body.createdAt,
          objectId: body.objectId
        };
        var statusCode = 201;
        var headers = defaultCorsHeaders;
        headers['Content-Type'] = 'application/json';

        res.writeHead(statusCode, headers);
        res.end(JSON.stringify(resBody));
      });
  },
  GET: (req, res) => {
    let resBody = {
      results: Messages.messages
    };
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';

    res.writeHead(statusCode, headers);
    res.end(JSON.stringify(resBody));
  },
  DELETE: (req, res) => {},
  OPTIONS: (req, res) => {}
};

module.exports.requestHandler = function(request, response) {
  if (request.method === 'OPTIONS') {
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'plain/text';

    response.writeHead(statusCode, headers);
    response.end('');
  }
  let urlObject = url.parse(request.url);
  if (urlObject.pathname === '/chatterbox/classes/messages') {
    if (request.method === 'POST') {
      return responses.POST(request, response);
    }
    if (request.method === 'GET') {
      return responses.GET(request, response);
    }
  }
  var headers = defaultCorsHeaders;

  if (urlObject.pathname === '/') {
    urlObject.pathname = '/index.html';
  }
  console.log(urlObject.pathname);
  fs.readFile('.' + urlObject.pathname, function(err, file) {
    console.log(err);
    if (err) {
      headers['Content-Type'] = 'text/plain';
      response.writeHead(404, headers);
      response.end('File not found');
      console.log(response);
    } else {
      let fileExtension = urlObject.pathname.split('.')[1];
      let mimeType = mimeTypes[fileExtension];
      headers['Content-Type'] = mimeType;
      response.writeHead(200, headers);
      response.end(file);
    }
  });
};
