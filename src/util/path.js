"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("../../root");
function path_src(...segs) {
    return root_1.path_root('src', ...segs);
}
exports.path_src = path_src;
function path_storage(...segs) {
    return root_1.path_root('storage', ...segs);
}
exports.path_storage = path_storage;
function path_view(...segs) {
    return path_src('view', ...segs);
}
exports.path_view = path_view;
//# sourceMappingURL=path.js.map