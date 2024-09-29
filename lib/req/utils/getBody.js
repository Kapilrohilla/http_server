const CustomError = require("../../error/Error");

/**
 * 
 * @param {{contentType: string,plainbody: string}} param0 
 */
module.exports = ({ contentType, plainbody }) => {
    let body;

    switch (contentType) {
        case 'application/json': {
            try {
                body = JSON.parse(plainbody.trim());
                break;
            } catch (err) {
                throw new CustomError({ message: "JSON parse error", isoperational: false, errors: err.message });
            }
        }
        default:
            body = plainbody;
    }
    return body;
}