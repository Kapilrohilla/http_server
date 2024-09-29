const { sendResponse } = require('../../utils/response/response');
const sendFile = require('../../utils/response/sendFile');
const path = require('path');
/**
 * @param {Socket} socket
 */
const rootRoutes = (socket) => {
  const method = socket.method;

  if (method === 'GET') {
    return sendFile(path.join(__dirname, '../../../public/index.html'), 'text/html', socket);
  } else {
    return sendResponse(405, 'text/plain', '', 'Method Not Allowed', socket)
  }


};

module.exports = rootRoutes;
