const net = require("net");
const { serverLog } = require('./logger/logger')

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    // console.log('client connected');
    serverLog.log("client connected");

    socket.write("HTTP/1.1 200 OK\r\n")
    socket.write("Content-Type: text/plain\r\n")
    socket.write("\r\n")

    // socket.on('data', (data) => {
    //     console.log(data.toString("utf-8"));
    // })
    socket.on("close", () => {
        socket.end();
        console.log("connection closed");
        // server.close();
    });
    socket.end();
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

