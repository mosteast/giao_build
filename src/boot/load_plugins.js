"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("../../root");
const config_1 = require("../config");
const path_1 = require("../util/path");
const print_helper_1 = require("@mosteast/print_helper");
function load_plugins(server) {
    print_helper_1.print_verbose('* load_plugins');
    // Important security headers for Fastify. It is a port from
    // express of helmet
    server.register(require('fastify-helmet'));
    // WebSocket support.
    server.register(require('fastify-websocket'), {
        maxPayload: config_1.$.server.ws.max_payload,
    });
    // Plugin for serving static files.
    server.register(require('fastify-static'), {
        root: root_1.path_root('public'),
        prefix: '/public/',
    });
    // Adds compression utils to the Fastify reply object.
    server.register(require('fastify-compress'), { global: true });
    // For route-specific rate limit, see:
    // https://github.com/fastify/fastify-rate-limit#options-on-the-endpoint-itself
    server.register(require('fastify-rate-limit'), {
        max: config_1.$.server.throttle.max,
        timeWindow: config_1.$.server.throttle.time_window,
    });
    // Measure process load with automatic handling of "Service
    // Unavailable" plugin for Fastify.
    server.register(require('under-pressure'), {
        maxEventLoopDelay: config_1.$.server.pressure.max_event_loop_delay,
        message: config_1.$.server.pressure.message,
        retryAfter: config_1.$.server.pressure.retry_after_header,
        exposeStatusRoute: config_1.$.server.pressure.expose_status_route,
    });
    // CORS support, cors enabled by default.
    server.register(require('fastify-cors'));
    // View template support
    server.register(require('point-of-view'), {
        engine: {
            ejs: require('ejs'),
        },
        templates: path_1.path_view(),
    });
}
exports.load_plugins = load_plugins;
//# sourceMappingURL=load_plugins.js.map