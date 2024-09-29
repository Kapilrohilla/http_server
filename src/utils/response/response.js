function sendResponse(
  statusCode,
  contentType,
  responseHeaders,
  responeBody,
  socket,
) {
  socket.write(`HTTP/1.1 ${statusCode} ${statusMessages[statusCode] || "Don't Know"}\r\n`);
  switch (contentType) {
    case 'text/plain':
      socket.write('Content-Type: text/plain\r\n');
      break;
    case 'text/html':
      socket.write('Content-Type: text/html\r\n');
      break;
    case 'application/json':
      socket.write('Content-Type: application/json\r\n');
      break;
    default:
      socket.write('Content-Type: text/plain\r\n');
  }
  socket.write(`Content-Length: ${getResponseSize(responeBody)}\r\n`);
  socket.write(responseHeaders.split('\n').join('\r\n'));
  socket.write('\r\n');
  socket.write(responeBody);
  socket.end();
}

const statusMessages = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  301: 'Moved Permanently',
  302: 'Found (Temporary Redirect)',
  304: 'Not Modified',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  409: 'Conflict',
  422: "Unprocessable Entity",
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

const getResponseSize = (responseBody) => {
  return new Blob([responseBody]).size;
};
module.exports = { sendResponse, getResponseSize };
