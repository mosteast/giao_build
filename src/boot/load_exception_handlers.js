"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = require("../error/base_error");
const type_1 = require("../error/type");
const bag_1 = require("../lib/helper/bag");
const logger_1 = require("../logger/logger");
const print_helper_1 = require("@mosteast/print_helper");
/**
 * Add different kinds of exception handlers
 * @param {fastify.FastifyInstance} server
 */
function load_exception_handlers(server) {
    print_helper_1.print_verbose('* load_exception_handlers');
    server.setErrorHandler(on_server_exception);
    process.on('uncaughtException', on_uncaught);
    process.on('unhandledRejection', on_rejection);
}
exports.load_exception_handlers = load_exception_handlers;
function on_server_exception(e, i, o) {
    var _a;
    let code = 500, payload = bag_1.bago(e); // Build response payload.
    logger_1.error(e);
    // Set status code correctly.
    if (e instanceof base_error_1.Base_error && e.level === type_1.E_level.external) {
        code = (_a = e.status_code, (_a !== null && _a !== void 0 ? _a : 400));
    }
    o
        .status(code)
        .send(payload);
}
function on_uncaught(e) {
    logger_1.error(e);
}
function on_rejection(reason, promise) {
    promise.catch(e => logger_1.error(e));
}
//# sourceMappingURL=load_exception_handlers.js.map