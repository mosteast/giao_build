"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require the framework and instantiate it
const print_helper_1 = require("@mosteast/print_helper");
const env_1 = require("../env");
const load_database_1 = require("./boot/load_database");
const load_decorators_1 = require("./boot/load_decorators");
const load_exception_handlers_1 = require("./boot/load_exception_handlers");
const load_hooks_1 = require("./boot/load_hooks");
const load_plugins_1 = require("./boot/load_plugins");
const load_redis_1 = require("./boot/load_redis");
const setup_fs_1 = require("./boot/setup_fs");
const start_schedules_1 = require("./boot/start_schedules");
const config_1 = require("./config");
const logger_1 = require("./logger/logger");
const route_1 = require("./route");
function boot() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = yield server_build();
        yield server_start(server);
    });
}
exports.boot = boot;
function server_build() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = require('fastify')();
        load_exception_handlers_1.load_exception_handlers(server);
        yield setup_fs_1.setup_fs();
        yield env_1.validate_envs();
        yield load_redis_1.load_redis();
        yield load_database_1.load_database();
        yield load_database_1.after_start_mysql();
        load_plugins_1.load_plugins(server);
        load_hooks_1.load_hooks(server);
        load_decorators_1.load_decorators(server);
        route_1.load_routes(server);
        start_schedules_1.start_schedules();
        return server;
    });
}
exports.server_build = server_build;
// Run the server!
function server_start(server) {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_verbose('* server_start');
        try {
            const { host, port } = config_1.$.server;
            yield server.listen(port, host);
            logger_1.info(`\nServer listening on: http://${host}:${port}`);
        }
        catch (e) {
            logger_1.error(e);
        }
    });
}
exports.server_start = server_start;
//# sourceMappingURL=index.js.map