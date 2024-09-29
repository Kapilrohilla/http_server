
module.exports = (data) => {
    const headers = data.split("\r\n")
    const finalHeaders = {};
    let body = "";
    let bodyStart = false;
    for (let i = 1; i < headers.length; i++) {
        if (headers[i] === "") {
            bodyStart = true;
        }
        if (bodyStart) {
            body += headers[i]
        } else if (!bodyStart) {
            const header = headers[i].split(":");
            finalHeaders[header[0].trim().toLowerCase()] = header[1].trim().toLowerCase();
        }
    }

    return { headers: finalHeaders, body }
}