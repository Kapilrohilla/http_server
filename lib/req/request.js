/**
 * Extends the Socket type from the 'net' module to include a 'req' property.
 * 
 * @param {Socket & { req?: object }} client - The client socket to extend.
 */
const { Socket } = require("net");
const getMethodAndPath = require("./utils/getMethodAndPath");
const getBody = require("./utils/getBody");
const getHeadersAndBody = require("./utils/getHeadersAndBody");
/**
 * @typedef {import('net').Socket & { req: object }} ExtendedSocket
 */


/**
 * 
 * @param {ExtendedSocket} client 
 */
const handleRequest = (data, client) => {
    client.req = {}
    const { method, route } = getMethodAndPath(data);
    client.req.method = method;
    client.req.route = route;
    client.req.routepath = (route.pathname.slice(1)).split("/");
    client.req.query = route.query;
    const headerAndBody = getHeadersAndBody(data);
    client.req.plainbody = headerAndBody.body;
    client.req.headers = headerAndBody.headers
    const body = getBody({ contentType: client.req.headers['content-type'], plainbody: client.req.plainbody });
    client.req.body = body;
}

module.exports = handleRequest;