const { sendResponse } = require('../../utils/response/response');
const sendFile = require('../../utils/response/sendFile');
const path = require('path');
const RootController = require('./controller');
const CustomError = require('../../../lib/error/Error');
/**
 * @param {Socket} socket
 */
const rootRoutes = (socket) => {
  const method = socket.req.method;
  const controllerInstance = new RootController({ client: socket, sendFile, sendResponse, path, CustomError });
  if (method === 'GET') {
    controllerInstance.handleGet();
  } else {
    return sendResponse(405, 'text/plain', '', 'Method Not Allowed', socket)
  }


};

module.exports = rootRoutes;
