"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const shelljs_1 = require("shelljs");
const lack_path_1 = require("../../src/error/lack_path");
const print_helper_1 = require("@mosteast/print_helper");
function env_file_exist(path) {
    try {
        fs_1.statSync(path_1.resolve(path, '.env'));
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.env_file_exist = env_file_exist;
function confirm_env_file(path = shelljs_1.pwd().toString()) {
    if (!env_file_exist(path)) {
        print_helper_1.print_error(`
.env file not found in directory: ${path}, please configure .env file and try again.
`);
        throw new lack_path_1.Lack_path('Missing .env file');
    }
}
exports.confirm_env_file = confirm_env_file;
//# sourceMappingURL=fs.js.map