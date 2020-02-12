"use strict";
/*
 |--------------------------------------------------------------------------
 | Functionality related to project base directory
 |--------------------------------------------------------------------------
 | !!! THIS FILE IS LOCATION RESTRICTED, DON'T MOVE IT !!!
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
/**
 * App base path
 * @param segments
 *
 * @example Get app base dir
 */
function path_root(...segments) {
    return path_1.resolve(__dirname, ...segments);
}
exports.path_root = path_root;
function path_build(...segments) {
    return path_root('build', ...segments);
}
exports.path_build = path_build;
function path_root_relative(...segments) {
    return path_1.relative(path_root(), path_root(...segments));
}
exports.path_root_relative = path_root_relative;
//# sourceMappingURL=root.js.map