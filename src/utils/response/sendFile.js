const { Socket } = require('net');
const fs = require('fs');
/**
 *
 * @param {string} filePath should be absolute path
 * @param {Socket} client
 */
function sendFile(filePath, client) {
  client.write('HTTP/1.1 200 OK\r\n');
  client.write('Content-Type: text/html\r\n\r\n');
  const stream = fs.createReadStream(filePath);
  stream.on('data', (chunk) => {
    client.write(chunk);
  });
  stream.on('end', () => {
    client.end();
  });
  stream.on('error', (err) => {
    console.error(err);
    client.write('HTTP/1.1 500 Internal Server Error\r\n');
    client.end();
  });
  return true;
}
module.exports = sendFile;
