

const { Socket } = require("net");
const { serverLog } = require("../logger/logger");
const { sendResponse } = require("../utils/response");
const url = require('url');
const sendFile = require("../utils/sendFile");
/**
 * 
 * @param {string} data 
 * @param {Socket} socket 
 */
function handleRoute(data, socket) {
    const { headers, method, route } = getUrlHeaders(data)
    serverLog.log(`${method.toUpperCase()} ${route.pathname}`)
    let shouldContinue;
    switch (route.pathname) {
        case "": {
            shouldContinue = sendFile(__dirname + "/../public/index.html", socket)
            break;
        }
        case "/test": {
            shouldContinue = sendResponse(200, 'text/plain', '', 'working!', socket)
            break;
        }
        default: {
            shouldContinue = sendResponse(404, 'text/plain', '', 'Not found', socket)
            break
        }
    }
    if (!shouldContinue) socket.end()
}
/**
 * 
 * @param {string} data 
 * 
 * @returns 
 */
const getUrlHeaders = (data) => {
    data = data.toLowerCase()
    const dataArr = data.split("\r\n")
    const urlstring = url.parse(dataArr[0].split(" ")[1], true);
    urlstring.pathname = urlstring.pathname.replace(/\/$/, "");
    return {
        method: dataArr[0].split(" ")[0],
        route: urlstring,
        headers: dataArr.slice(1)
    }
}

module.exports = handleRoute;