class CustomError extends Error {
    constructor({ message, status, errors, isoperational, stack = null }) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.errors = errors;
        this.isoperational = isoperational;
        Error.captureStackTrace(this, this.constructor);
        if (stack) this.stack = stack;
    }
}

module.exports = CustomError;