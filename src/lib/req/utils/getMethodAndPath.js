const url = require('url');
/**
 * 
 * @param {string} data 
 */
module.exports = (data) => {
    const headers = data.split("\r\n")
    const method = headers[0].split(" ")[0];
    let route = headers[0].split(" ")[1].replace(/\/$/, "");
    if (route === "") {
        route = "/";
    }

    route = url.parse(route, true)
    return { method: method, route: route }
}