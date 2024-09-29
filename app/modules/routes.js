
// GET routes
function handleGETRoutes(route, socket) {
    console.log(route);
    switch (route) {
        case "/": {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
            break;
        }
        default: {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
            break;
        }
    }
    socket.end();

}

module.exports = handleGETRoutes;