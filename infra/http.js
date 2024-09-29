const { serverLog } = require('../src/logger/logger');
const { sendResponse } = require('../src/utils/response/response');
const getUrlHeaders = require('../src/utils/getUrlHeaders');
const rootRoutes = require('../src/modules/root/routes');
const handleRequest = require('../lib/req/request');
/**
 *
 * @param {string} data
 * @param {import('../lib/req/request').ExtendedSocket} socket
 */
function handleRoute(data, socket) {
  // extends the socket object to include a 'req' property
  handleRequest(data, socket);
  const route = socket.req.routepath;
  console.log(route);
  if (route[0] === "") {
    return rootRoutes(socket);
  } else if (route[0] === "account") {
    return accountRoutes(socket);
  } else if (route[0] === "test") {
    return sendResponse(200, 'text/plain', '', 'working!', socket);
  } else {
    return sendResponse(404, 'text/plain', '', 'Not Found', socket);
  }

}
module.exports = handleRoute;
