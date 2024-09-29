const { Socket } = require('net');
const fs = require('fs');
/**
 *
 * @param {string} filePath should be absolute path
 * @param {Socket} socket
 */
function sendFile(filePath, socket) {
  socket.write('HTTP/1.1 200 OK\r\n');
  socket.write('Content-Type: text/html\r\n\r\n');
  const stream = fs.createReadStream(filePath);
  stream.on('data', (chunk) => {
    socket.write(chunk);
  });
  stream.on('end', () => {
    socket.end();
  });
  stream.on('error', (err) => {
    console.error(err);
    socket.write('HTTP/1.1 500 Internal Server Error\r\n');
    socket.end();
  });
  return true;
}
module.exports = sendFile;
