class Logger {
    constructor(name) {
        this.name = name;
    }

    log(message) {
        console.log(`[log] ${message}`);
    }

    error(err_msg) {
        console.error(`[erorr] ${err_msg}`);
    }
    info(err_msg) {
        console.error(`[info] ${err_msg}`);
    }
}

module.exports = {
    serverLog: new Logger(),
}