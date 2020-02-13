"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../../../env");
/**
 * Check env.app_mode
 * @param i
 * @param o
 */
function mode_check(i, o, done) {
    const mode = env_1.env(env_1.__.app_mode);
    if (mode !== env_1.N_app_mode.up) {
        let view; // View file path
        switch (mode) {
            case env_1.N_app_mode.maintenance:
                view = 'mode/maintenance.ejs';
                break;
            case env_1.N_app_mode.down:
            default:
                view = 'mode/down.ejs';
        }
        o.header('retry-after', 60 * 3);
        o.code(503);
        o.view(env_1.env(env_1.__.app_mode_view) || view);
    }
    else {
        done();
    }
}
exports.mode_check = mode_check;
//# sourceMappingURL=on_request.js.map