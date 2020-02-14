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
const node_fetch_1 = require("node-fetch");
const http_1 = require("waitcha/lib/commands/http");
const env_1 = require("../../../../env");
function confirm_up_phpmyadmin() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbm_url = `http://${env_1.env(env_1.__.base_host)}:${env_1.env(env_1.__.base_port_phpmyadmin)}`;
        yield http_1.default.run(['-r', '30', '--mute', dbm_url]);
        if ((yield node_fetch_1.default(dbm_url)).ok) {
            print_helper_1.print_success(`\nDatabase manager is up and running at: ${dbm_url}`);
        }
        else {
            print_helper_1.print_error(`\nDatabase manager should have already started, but ${dbm_url} is not accessible, please report this error to us.`);
        }
    });
}
exports.confirm_up_phpmyadmin = confirm_up_phpmyadmin;
//# sourceMappingURL=phpmyadmin.js.map