"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("../../root");
const shelljs_1 = require("shelljs");
const fs_1 = require("fs");
const path_1 = require("path");
exports.r = root_1.path_root;
exports.b = root_1.path_build;
function is_build_dir(dir = shelljs_1.pwd().toString()) {
    try {
        fs_1.statSync(path_1.resolve(dir, 'build_state.json'));
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.is_build_dir = is_build_dir;
function path_docker(...args) {
    return root_1.path_root('docker', ...args);
}
exports.path_docker = path_docker;
function path_config_map(...args) {
    return path_docker('config_map', ...args);
}
exports.path_config_map = path_config_map;
//# sourceMappingURL=path.js.map