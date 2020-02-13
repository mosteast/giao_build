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
const fs_extra_1 = require("fs-extra");
const path_1 = require("../../../util/path");
const fs_1 = require("../../../../src/util/fs");
function before_start_nginx({ dcc }) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = path_1.path_config_map('nginx/template/nginx.conf.template');
        const compiled = yield fs_1.template_file(path, process.env);
        fs_extra_1.writeFileSync(path_1.path_config_map('nginx/nginx.conf'), compiled);
    });
}
exports.before_start_nginx = before_start_nginx;
//# sourceMappingURL=nginx.js.map