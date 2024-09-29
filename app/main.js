const net = require("net");
const { serverLog } = require('./logger/logger');
const handleGETRoutes = require("./modules/routes");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.setEncoding('utf-8')
    serverLog.log("client connected");

    socket.on('data', (data) => {
        const dataArr = data.split("\r\n");
        const requestLine = dataArr[0].split(" ");
        if (requestLine[0] === 'GET') {
            const route = requestLine[1];
            handleGETRoutes(route, socket)
        } else {
            serverLog.error("Unallowed Method")
            socket.write("HTTP/1.1 405 Fucked\r\n")
            socket.end(() => {
                console.log('close it');
            })
        }
    })

    socket.on("close", () => {
        socket.end();
        console.log("connection closed");
        // server.close();
    });
    socket.on('end', () => {
        console.log('client disconnected');
    });
});


process.on("uncaughtException", (err) => {
    console.log("uncaught Exception");
    console.log(err)
})



process.on("unhandledRejection", (reason) => {
    console.log("unhandled rejection");
    console.log(reason);
})
server.listen(4221, "localhost");
