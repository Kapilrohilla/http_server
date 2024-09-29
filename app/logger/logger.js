class Logger {
    constructor(name) {
        this.name = name;
    }

    log(message) {
        console.log(`[${this.name}] ${message}`);
    }

    error(err_msg) {
        console.error(`[${this.name}] ${err_msg}`);
    }
}

module.exports = {
    serverLog: new Logger("server"),
}