const { sendResponse } = require("../../utils/response/response");
const sendFile = require("../../utils/response/sendFile");

/**
 * @param {Socket} socket 
 */
const rootRoutes = (urlHeaders, socket) => {
    const { headers, method, route } = urlHeaders;
    switch (urlHeaders.pathname) {
        case "/":
            console.log("root route");
            switch (method) {
                case "get": {
                    // console.log("get method");
                    sendFile(__dirname + "/../public/index.html", socket);
                    break;
                }
                default: {
                    console.log("method not allowed");
                    sendResponse(405, 'text/plain', '', 'Method not allowed', socket);
                }
            }
            break;
        default: sendResponse(404, 'text/plain', '', 'Not found', socket);
    }
}


module.exports = rootRoutes;