"use strict";
/*
 |--------------------------------------------------------------------------
 | App Logger
 |--------------------------------------------------------------------------
 | All logs come from here.
 */
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
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const pino = require("pino");
const config_1 = require("../config");
const lack_config_1 = require("../error/lack_config");
const fs_2 = require("../util/fs");
const print_helper_1 = require("@mosteast/print_helper");
const printer_1 = require("@mosteast/print_helper/src/printer");
const env_1 = require("../../env");
let logger = {}; // Logger singleton
/**
 * Get logger by name
 *
 * @param name
 */
exports.get_logger = (name) => {
    if (logger[name]) {
        return logger[name];
    }
    // Get log config.
    const conf = config_1.$.log[name];
    if (!conf) {
        throw new lack_config_1.Lack_config(`Logger "${name}" not configured, Please config logger in \`$\` object`, '');
    }
    const file = fs_1.createWriteStream(conf.path, { flags: 'a' })
        .on('error', e => e.code === 'ENOENT' && print_helper_1.print_warn(`Log path not exists: "${conf.path}"`));
    const r = logger[name] = pino({}, file);
    return r;
};
function log(type, msg, ...args) {
    exports.get_logger(type)[type](msg, ...args);
    if (env_1.env(env_1.__.log_mute) !== 'true') {
        print_helper_1.print(type, msg, ...args);
    }
}
// ==== shortcuts start ====
function info(a, ...args) {
    log(printer_1.N_print_type.info, a, ...args);
}
exports.info = info;
function warn(a, ...args) {
    log(printer_1.N_print_type.warn, a, ...args);
}
exports.warn = warn;
function error(a, ...args) {
    log(printer_1.N_print_type.error, a, ...args);
}
exports.error = error;
/**
 * Create log directories and file if not exist
 *
 * Will lookup `$` to get log path info.
 */
function ensure_log_files() {
    return __awaiter(this, void 0, void 0, function* () {
        const paths = config_1.$.log;
        for (let key in paths) {
            let it = paths[key];
            yield fs_extra_1.ensureFile(it.path);
        }
    });
}
exports.ensure_log_files = ensure_log_files;
function clear_log_files() {
    return __awaiter(this, void 0, void 0, function* () {
        const paths = config_1.$.log;
        for (let key in paths) {
            let it = paths[key];
            yield fs_2.file_clear(it.path).catch();
        }
    });
}
exports.clear_log_files = clear_log_files;
//# sourceMappingURL=logger.js.map