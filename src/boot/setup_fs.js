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
const logger_1 = require("../logger/logger");
const print_helper_1 = require("@mosteast/print_helper");
/**
 * Setup required directories and files
 */
function setup_fs() {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_verbose('* setup_fs');
        yield logger_1.ensure_log_files();
    });
}
exports.setup_fs = setup_fs;
//# sourceMappingURL=setup_fs.js.map