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
/**
 * Docker compose config (Partially)
 * Object parsed from docker-compose.yml
 */
const docker_compose_1 = require("docker-compose");
const js_yaml_1 = require("js-yaml");
const env_1 = require("../../../env");
const shelljs_1 = require("shelljs");
const print_helper_1 = require("@mosteast/print_helper");
const fs_1 = require("../../util/fs");
const constant_1 = require("../../../src/constant");
const env_helper_1 = require("@mosteast/env_helper");
/**
 * Get docker compose docker-compose.yml object
 * @param path
 */
function parse_dc_config(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const yaml = yield docker_compose_1.config({
            config: path,
        }).catch(console.log);
        return js_yaml_1.load(yaml.out);
    });
}
exports.parse_dc_config = parse_dc_config;
function get_default_dc_config_path(path) {
    if (path) {
        return path;
    }
    return env_1.env(env_1.__.NODE_ENV) === env_1.N_node_env.production ? constant_1.N_file_dc_prod : constant_1.N_file_dc_dev;
}
exports.get_default_dc_config_path = get_default_dc_config_path;
function build_opt_dc(merge, opt) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const r = {
            config: get_default_dc_config_path(),
            cwd: shelljs_1.pwd().toString(),
            log: true,
            services: [],
        };
        if ((_a = opt) === null || _a === void 0 ? void 0 : _a.parse_dc_config) {
            r.dcc = yield parse_dc_config(r.config);
            r.services = Object.keys(r.dcc.services);
        }
        return Object.assign(Object.assign({}, r), merge);
    });
}
exports.build_opt_dc = build_opt_dc;
/**
 * docker-compose build
 */
function build_containers(opt) {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_verbose('* build_containers');
        env_helper_1.reload_env();
        fs_1.confirm_env_file();
        env_1.validate_envs();
        opt = yield build_opt_dc(opt, { parse_dc_config: true });
        yield docker_compose_1.buildMany(opt.services, opt);
    });
}
exports.build_containers = build_containers;
//# sourceMappingURL=docker_compose.js.map