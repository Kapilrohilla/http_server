const { sendResponse } = require('../../utils/response/response');
const sendFile = require('../../utils/response/sendFile');
const path = require('path');
/**
 * @param {Socket} socket
 */
const rootRoutes = (socket) => {
  const req = socket.req;

  switch (req.path) {
    case "/": {
      switch (req.method) {
        case "GET": {
          sendFile(path.resolve(__dirname, '../../public/index.html'), socket);
          break;
        }
        default: {
          sendResponse(405, 'text/plain', '', 'Method not allowed', socket);
        }
      }
      break;
    }
    default: {
      sendResponse(404, 'text/plain', '', 'Not found', socket);
      break;
    }
  }
};

module.exports = rootRoutes;
