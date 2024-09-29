function sendResponse(
  statusCode,
  contentType,
  responseHeaders,
  responeBody,
  socket,
) {
  socket.write(`HTTP/1.1 ${statusCode} OK\r\n`);
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

const getResponseSize = (responseBody) => {
  return new Blob([responseBody]).size;
};
module.exports = { sendResponse, getResponseSize };
