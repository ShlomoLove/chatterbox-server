let defaultCorsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

let mimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css',
  gif: 'image/gif'
};
let getReqBody = (req, callback) => {
  let body = [];
  req
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = JSON.parse(Buffer.concat(body).toString());
      callback(body);
    });
};

let sendResponse = (statusCode, contentType, resBody, res) => {
  let headers = defaultCorsHeaders;
  headers['Content-Type'] = contentType;
  res.writeHead(statusCode, headers);
  res.end(resBody);
};

let findMimeType = fileExtension => {
  return mimeTypes[fileExtension];
};

module.exports = { getReqBody, sendResponse, findMimeType };
