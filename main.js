const net = require("net");
const { serverLog } = require('./app/logger/logger');
const router = require('./app/infra/http')

console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
    socket.setEncoding('utf-8')

    socket.on('data', (data) => router(data, socket))
    socket.on('end', () => {
    })
    socket.on("close", () => {
        socket.end();
    });
});


process.on("uncaughtException", (err) => {
    console.log(err);
    serverLog.error(err)
})

process.on("unhandledRejection", (reason) => {
    serverLog.error(reason);
})
server.listen(4221, "localhost");
