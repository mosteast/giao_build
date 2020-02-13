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
const Redis = require("ioredis");
const lack_config_1 = require("../error/lack_config");
const bad_connection_1 = require("../error/bad_connection");
const rds_1 = require("../rds/rds");
const print_helper_1 = require("@mosteast/print_helper");
const env_1 = require("../../env");
/**
 * Connection name
 */
var N_connection;
(function (N_connection) {
    N_connection["main"] = "main";
})(N_connection = exports.N_connection || (exports.N_connection = {}));
/**
 * Redis instance singleton
 */
let ins;
function redis(connection_name = N_connection.main) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ins) {
            let name = build_connection_name_redis(connection_name);
            const config = rds_1.connection_redis[name];
            if (!config) {
                throw new lack_config_1.Lack_config(`Invalid redis connection name: "${name}", config not found`);
            }
            const { port, host, db } = rds_1.connection_redis[name];
            print_helper_1.print_verbose(`Create redis connection "${name}"`);
            ins = new Redis({ port, host, db });
            yield ins.ping().catch(e => {
                const error = new bad_connection_1.Bad_connection(`Failed to connect to redis server, config:`);
                print_helper_1.print_error(config);
                error.data = { parent_error: e };
                throw error;
            });
        }
        return ins;
    });
}
exports.redis = redis;
function set_redis_ins(redis) {
    ins = redis;
}
exports.set_redis_ins = set_redis_ins;
function build_connection_name_redis(name = N_connection.main) {
    if (env_1.env('NODE_ENV') === env_1.N_node_env.testing) {
        name += '_test';
    }
    return name;
}
exports.build_connection_name_redis = build_connection_name_redis;
//# sourceMappingURL=redis.js.map