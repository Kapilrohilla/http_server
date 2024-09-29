const net = require("net");
const { serverLog } = require('./logger/logger');
const handleRoute = require("./modules/routes");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.setEncoding('utf-8')

    socket.on('data', (data) => handleRoute(data, socket))

    socket.on("close", () => {
        socket.end();
    });


    // socket.on('end', () => {
    // });
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
