"use strict";
// Fastify Lifecycle
// Following the schema of the internal lifecycle of Fastify.
// On the right branch of every section there is the next phase of
// the lifecycle, on the left branch there is the corresponding error
// code that will be generated if the parent throws an error (note
// that all the errors are automatically handled by Fastify). @see
// https://www.fastify.io/docs/latest/Lifecycle/
// @formatter:off
//
// Incoming Request
//   │
//   └─▶ Routing
//         │
//         └─▶ Instance Logger
//              │
//        404 ◀─┴─▶ onRequest Hook
//                   │
//         4**/5** ◀─┴─▶ run Middlewares
//                         │
//               4**/5** ◀─┴─▶ preParsing Hook
//                               │
//                     4**/5** ◀─┴─▶ Parsing
//                                    │
//                          4**/5** ◀─┴─▶ preValidation Hook
//                                         │
//                                   415 ◀─┴─▶ Validation
//                                               │
//                                         400 ◀─┴─▶ preHandler Hook
//                                                     │
//                                           4**/5** ◀─┴─▶ User Handler
//                                                           │
//                                                           └─▶ Reply
//                                                                 │
//                                                       4**/5** ◀─┴─▶ preSerialization Hook
//                                                                       │
//                                                                       └─▶ onSend Hook
//                                                                             │
//                                                                   4**/5** ◀─┴─▶ Outgoing Response
//                                                                                   │
//                                                                                   └─▶ onResponse Hook
// @formatter:on
Object.defineProperty(exports, "__esModule", { value: true });
const print_helper_1 = require("@mosteast/print_helper");
const on_request_1 = require("./hook/on_request");
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Don't use async / await or returning a Promise in hook callbacks
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// The `done()` callback is not available when using async/await or
// returning a Promise. If you do invoke a done callback in this
// situation unexpected behaviour may occur, e.g. duplicate
// invocation of handlers.
// @see https://github.com/fastify/fastify/blob/master/docs/Hooks.md
/**
 * All request hooks are registered here
 * @param fastify
 */
function load_hooks(server) {
    print_helper_1.print_verbose('* load_hooks');
    hook_on_request(server);
    // Add hooks...
}
exports.load_hooks = load_hooks;
function hook_on_request(server) {
    print_helper_1.print_verbose('** hook_on_request');
    server.addHook('onRequest', (i, o, done) => {
        on_request_1.mode_check(i, o, done);
    });
}
function hook_on_response(server) {
    print_helper_1.print_verbose('** hook_on_response');
    server.addHook('onResponse', (i, o, done) => {
        // console.log('Replying 1 request!')
    });
}
//# sourceMappingURL=load_hooks.js.map