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
const js_yaml_1 = require("js-yaml");
const root_1 = require("../../../root");
const fs_extra_1 = require("fs-extra");
const env_1 = require("../../../env");
const path_1 = require("../../util/path");
const print_helper_1 = require("@mosteast/print_helper");
const constant_1 = require("../../../src/constant");
const invalid_state_1 = require("../../../src/error/invalid_state");
function read_docker_compose_config(path = root_1.path_root('docker-compose.yml')) {
    return __awaiter(this, void 0, void 0, function* () {
        return js_yaml_1.load(yield fs_extra_1.readFile(path, 'utf8'));
    });
}
exports.read_docker_compose_config = read_docker_compose_config;
function confirm_production_dir() {
    const e = env_1.get_node_env();
    if (e !== env_1.N_node_env.production && path_1.is_build_dir()) {
        const msg = `${constant_1.N_app_name} is running in build directory, but current NODE_ENV is "${e}", expecting "${env_1.N_node_env.production}".`;
        print_helper_1.print_error(msg);
        throw new invalid_state_1.Invalid_state(msg);
    }
}
exports.confirm_production_dir = confirm_production_dir;
//# sourceMappingURL=util.js.map