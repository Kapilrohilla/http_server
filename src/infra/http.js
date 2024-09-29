const { Socket } = require("net");
const { serverLog } = require("../logger/logger");
const { sendResponse } = require("../utils/response/response");
const getUrlHeaders = require("../utils/getUrlHeaders");
const rootRoutes = require("../modules/root/routes");
/**
 *
 * @param {string} data
 * @param {Socket} socket
 */
function handleRoute(data, socket) {
  const { headers, method, route } = getUrlHeaders(data);
  serverLog.log(`${method.toUpperCase()} ${route.pathname}`);
  switch (route.pathname) {
    case "": {
      rootRoutes(getUrlHeaders(data), socket);
      break;
    }
    case "/test": {
      shouldContinue = sendResponse(200, "text/plain", "", "working!", socket);
      break;
    }
    default: {
      shouldContinue = sendResponse(404, "text/plain", "", "Not found", socket);
      break;
    }
  }
}
module.exports = handleRoute;
