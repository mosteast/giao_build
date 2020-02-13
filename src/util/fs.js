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
const str_1 = require("./str");
/**
 * Clear file content (not delete it)
 */
function file_clear(path) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_extra_1.truncate(path);
    });
}
exports.file_clear = file_clear;
/**
 * Compile template from template file
 * @param path
 * @param args
 * @param opt
 */
function template_file(path, args, opt) {
    return __awaiter(this, void 0, void 0, function* () {
        const raw = yield fs_extra_1.readFile(path);
        return str_1.template(raw, args, opt);
    });
}
exports.template_file = template_file;
//# sourceMappingURL=fs.js.map