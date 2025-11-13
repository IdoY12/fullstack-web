"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = notFound;
function notFound(req, res, next) {
    next({
        status: 404,
        message: 'yo bro the thing u look is not here'
    });
}
