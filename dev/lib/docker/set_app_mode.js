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
const print_helper_1 = require("@mosteast/print_helper");
const env_helper_1 = require("@mosteast/env_helper");
const env_1 = require("../../../env");
function set_app_mode(opt) {
    return __awaiter(this, void 0, void 0, function* () {
        const { mode } = Object.assign({}, opt);
        if (!env_1.N_app_mode[mode]) {
            const e = print_helper_1.print_error;
            e('Invalid mode, mode should be one of:');
            e(Object.values(env_1.N_app_mode).join('\n'));
            process.exit(1);
        }
        const key = env_1.__.app_mode;
        yield env_helper_1.env_set(key, mode);
        (yield env_helper_1.env_get(key)) === mode
            ? print_helper_1.print_success(`${key} has changed to "${mode}".\nYou can restart app now.`)
            : print_helper_1.print_error('Set env failed.');
    });
}
exports.set_app_mode = set_app_mode;
//# sourceMappingURL=set_app_mode.js.map