class RootController {
    /**
     * 
     * @param {import("../../../lib/req/request").ExtendedSocket} client 
     */
    constructor(dependencies) {

        const { client, sendFile, sendResponse, path, CustomError } = dependencies
        const requiredDependencies = ['client', 'sendFile', 'sendResponse', 'path', 'CustomError'];
        for (let i = 0; i < requiredDependencies.length; i++) {
            if (!dependencies.hasOwnProperty(requiredDependencies[i])) {
                throw new Error(`Missing dependency: ${requiredDependencies[i]}`);
            }
        }
        this.client = client;
        this.sendFile = sendFile;
        this.sendResponse = sendResponse;
        this.path = path;
        this.CustomError = CustomError;
    }

    handleGet() {
        return this.sendFile(this.path.join(__dirname, '../../../public/index.html'), this.client);
    }
    handlePost() {
        const body = this.client.req.body;

        return this.sendResponse(200, 'text/plain', '', body, this.client)
    }

}

module.exports = RootController;