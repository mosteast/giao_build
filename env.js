"use strict";
/*
 |--------------------------------------------------------------------------
 | Environment variables and .env file restriction
 |--------------------------------------------------------------------------
 | Most of the code is for restricting environment variables manipulations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * NODE_ENV possible values.
 */
const env_helper_1 = require("@mosteast/env_helper");
const root_1 = require("./root");
const constant_1 = require("./src/constant");
const print_helper_1 = require("@mosteast/print_helper");
const lack_config_env_1 = require("./src/error/lack_config_env");
const invalid_range_1 = require("./src/error/invalid_range");
const lodash_1 = require("lodash");
const invalid_environment_variable_1 = require("./src/error/invalid_environment_variable");
var N_node_env;
(function (N_node_env) {
    N_node_env["development"] = "development";
    N_node_env["staging"] = "staging";
    N_node_env["production"] = "production";
    N_node_env["testing"] = "testing";
})(N_node_env = exports.N_node_env || (exports.N_node_env = {}));
var N_app_mode;
(function (N_app_mode) {
    // ================= master =================
    // App is running
    N_app_mode["up"] = "up";
    // App is stopped, recover time unknown.
    N_app_mode["down"] = "down";
    // App is stopped as planned with predictable recover time.
    N_app_mode["maintenance"] = "maintenance";
    // ================= Other levels... =================
})(N_app_mode = exports.N_app_mode || (exports.N_app_mode = {}));
/**
 * All possible custom environment variable names definitions.
 */
var __;
(function (__) {
    // ================= master =================
    __["NODE_ENV"] = "NODE_ENV";
    __["COMPOSE_PROJECT_NAME"] = "COMPOSE_PROJECT_NAME";
    // ## Hosts and Ports
    //
    // ### Dev Mode
    //
    // In dev mode dev server will start directly in host machine, just
    // like a typical dev environment (for convenience consideration),
    // the difference is you can use any container service you want,
    // just expose container port to host machine by editing
    // `docker-compose.dev.yml` service ports. The in-development **app
    // doesn't have to know where these services are coming from, all
    // it need is service ports to communicate**.
    //
    // Whenever there is a port named `base_port_xxx` it means the
    // service `xxx` will be mapped to the base machine.
    // @formatter:off
    //                                    Developer
    //                                        ●
    //                                        │
    //                                        ▼
    //      base_host:base_port_a   base_host:base_port_b  base_host:base_port_c
    //    ┌─────────○─────────────────────────○────────────────────────○─────────┐
    //    │  ┌──────┼─────────────────────────┼────────────────────────┼──────┐  │
    //    │  │      ▽                         ▽                        ▽      │  │
    //    │  │  a:port_a                  b:port_b                 c:port_c   │  │
    //    │  │ ┌─────────┐               ┌─────────┐              ┌─────────┐ │  │
    //    │  │ │Container│               │Container│              │Container│ │  │
    //    │  │ │    A    │               │    B    │              │    B    │ │  │
    //    │  │ └─────────┘               └─────────┘              └─────────┘ │  │
    //    │  └─ Docker ───────────────────────────────────────────────────────┘  │
    //    └──── Dev Machine (base) ──────────────────────────────────────────────┘
    //
    //     ● Means requests (or connection) from ● to ▼.
    //     │
    //     ▼
    //
    //     ○ Means port ○ is mapping port ▽.
    //     │
    //     ▽
    // @formatter:on
    //
    // ### Production Mode
    //
    // @formatter:off
    //                            User
    //                              ●
    //                              │
    //                              ▼
    //                     www.some-domain.com
    //    ┌─ Prod Machine (base) ─────────────────────────────┐
    //    │                         ○                         │
    //    │                         │                         │
    //    │                         ▽                         │
    //    │                   ┌───────────┐                   │
    //    │                   │   nginx   │                   │
    //    │                   └───────────┘                   │
    //    │                         ○                         │
    //    │ ┌─ Docker ──────────────┼───────────────────────┐ │
    //    │ │                       │                       │ │
    //    │ │                       ▽ $app_name:port_app    │ │
    //    │ │                 ┌───────────┐                 │ │
    //    │ │                 │ $app_name │                 │ │
    //    │ │                 └───────────┘                 │ │
    //    │ │                       ●                       │ │
    //    │ │      ┌────────────────┼────────────────┐      │ │
    //    │ │      │                │                │      │ │
    //    │ │      ▼                ▼                ▼      │ │
    //    │ │  a:port_a         b:port_b         c:port_c   │ │
    //    │ │ ┌─────────┐      ┌─────────┐      ┌─────────┐ │ │
    //    │ │ │Container│      │Container│      │Container│ │ │
    //    │ │ │    A    │      │    A    │      │    A    │ │ │
    //    │ │ └─────────┘      └─────────┘      └─────────┘ │ │
    //    │ └───────────────────────────────────────────────┘ │
    //    └───────────────────────────────────────────────────┘
    //
    //     ● - Requests (or connection) from ● to ▼.
    //     │
    //     ▼
    //
    //     ○ - Port ○ is mapping port ▽.
    //     │
    //     ▽
    //
    //     $xxx - Dynamic variables.
    // @formatter:on
    // Base host
    // (Current machine)
    // : '0.0.0.0'
    __["base_host"] = "base_host";
    // App container port
    // : 3000
    __["port_app"] = "port_app";
    // App base port, will be dev server's port in dev mode
    // : 3000
    __["base_port_app"] = "base_port_app";
    // Different modes could behave differently.
    // see `N_app_mode`
    __["app_mode"] = "app_mode";
    // Possible custom view for app_mode, for instance, if current
    // app_mode is 'down' or 'maintain' we could display a custom
    // message to user while service is not available.
    // : 'path/to/view/custom.ejs'
    __["app_mode_view"] = "app_mode_view";
    // Project identifier. Applies the same pattern as variables.
    // valid: 'giao', 'giao1', 'giao_app'.
    // invalid: '1giao', 'giao-app',  'giao app', '-giao-'.
    __["app_name"] = "app_name";
    // Human friendly brand name, all strings
    // are valid.
    __["app_brand"] = "app_brand";
    // valid: 'www.xxx.com'
    // invalid: 'http://www.xxx.com'
    __["app_domain"] = "app_domain";
    // Password for access log file from web API.
    // If password is empty, logs will not be accessible from web API.
    __["app_log_password"] = "app_log_password";
    // Rate limit time window
    // valid: 1000 * 60
    __["app_throttle_time_window"] = "app_throttle_time_window";
    // Max requests in 1 `app_throttle_time_window`.
    // valid: 120
    __["app_throttle_max"] = "app_throttle_max";
    // Suppress console print from logger.
    __["log_mute"] = "log_mute";
    // Password salt for hashing password.
    __["salt_password"] = "salt_password";
    // ================= Other levels... =================
})(__ = exports.__ || (exports.__ = {}));
exports.default_envs = {
    // ================= master =================
    [__.NODE_ENV]: N_node_env.production,
    [__.app_mode]: N_app_mode.up,
};
/**
 * Required env variables
 */
exports.required_envs = {
    /**
     * Required env variables in all environment
     */
    [constant_1.N_common]: [
        // ================= master =================
        __.NODE_ENV,
        __.app_name,
        __.base_host,
        __.base_port_app,
    ],
    /**
     * Required env variables in development
     */
    development: [
    // ================= master =================
    // ================= Other levels... =================
    ],
    testing: [
    // ================= master =================
    // ================= Other levels... =================
    ],
    /**
     * Required env variables in production
     */
    production: [
        // ================= master =================
        __.port_app,
    ],
};
exports.env_validator = {
    [constant_1.N_common]: {
        [__.NODE_ENV](value) {
            if (!N_node_env[value]) {
                throw new invalid_range_1.Invalid_range(__.NODE_ENV, lodash_1.values(N_node_env));
            }
        },
        [__.app_name](value) {
            if (!constant_1.RE_identifier.test(value)) {
                throw new invalid_environment_variable_1.Invalid_environment_variable({ app_name: value }, `Value should match ${constant_1.RE_identifier}`);
            }
        },
    },
    development: {},
    testing: {},
    production: {},
};
/**
 * Get env variable
 *
 * This function will make sure env is loaded
 * @param key
 */
function env(key) {
    var _a;
    const exist = process.env[key];
    if (exist) {
        return exist;
    }
    env_helper_1.load_env_once(root_1.path_root(constant_1.N_file_env));
    return _a = process.env[key], (_a !== null && _a !== void 0 ? _a : exports.default_envs[key]);
}
exports.env = env;
/**
 * validate required environment variables
 * @param required
 */
function validate_required_envs(required) {
    if (!required) {
        required = [];
        for (let key in exports.required_envs) {
            if (key === constant_1.N_common || key === get_node_env()) {
                required = required.concat(exports.required_envs[key]);
            }
        }
    }
    print_helper_1.print_verbose('** validate_env');
    const errors = [];
    for (let it of required) {
        if (typeof it === 'string') {
            if (!env(it)) {
                errors.push(it);
            }
        }
        else {
            let exist = false;
            for (let it2 of it) {
                if (env(it2)) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                errors.push(it);
            }
        }
    }
    if (errors.length) {
        print_helper_1.print_error(`Missing following env variables:\n${errors.join('\n')}\n`);
        throw new lack_config_env_1.Lack_config_env(errors);
    }
}
exports.validate_required_envs = validate_required_envs;
/**
 * Validate environment variables
 * @param envs
 */
function validate_envs(envs) {
    validate_required_envs();
    envs = envs || process.env;
    for (let type in exports.env_validator) {
        if (type === constant_1.N_common || type === get_node_env()) {
            const fn_map = exports.env_validator[type];
            for (let name in fn_map) {
                const value = envs[name];
                if (value !== undefined) {
                    const fn = fn_map[name];
                    fn(value);
                }
            }
        }
    }
}
exports.validate_envs = validate_envs;
/**
 * Helper for getting NODE_ENV
 */
function get_node_env() {
    return env(__.NODE_ENV);
}
exports.get_node_env = get_node_env;
//# sourceMappingURL=env.js.map