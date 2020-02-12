"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("./util/path");
const env_1 = require("../env");
/**
 * Config constant
 * Private config object.
 * Should not be changed in run-time.
 */
const _config = {
    app: {
        brand: 'Giao',
        name: 'giao',
        mode: env_1.env(env_1.__.app_mode) || env_1.N_app_mode.up,
    },
    server: {
        host: env_1.env(env_1.__.base_host) || '0.0.0.0',
        port: parseInt(env_1.env(env_1.__.port_app)) || 3000,
        compress: {
            global: true,
        },
        pressure: {
            max_event_loop_delay: 1000,
            message: 'Under pressure!',
            retry_after_header: 60,
            expose_status_route: true,
        },
        throttle: {
            time_window: parseInt(env_1.env(env_1.__.app_throttle_time_window)) || 60000,
            max: parseInt(env_1.env(env_1.__.app_throttle_max)) || 120,
        },
        ws: {
            max_payload: 1024 * 1024 * 2,
        },
    },
    log: {
        access: { path: path_1.path_storage('log/access.log') },
        info: { path: path_1.path_storage('log/info.log') },
        warn: { path: path_1.path_storage('log/warn.log') },
        error: { path: path_1.path_storage('log/error.log') },
    },
};
/**
 * Config immutable shortcut
 */
exports.$ = Object.freeze(_config);
//# sourceMappingURL=config.js.map