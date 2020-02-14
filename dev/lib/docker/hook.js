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
const env_1 = require("../../../env");
const phpmyadmin_1 = require("./service/phpmyadmin");
const app_1 = require("./service/app");
exports.hook = {
    before_start: {},
    after_start: {
        app() {
            return __awaiter(this, void 0, void 0, function* () {
                // Test connection
                if (env_1.get_node_env() === env_1.N_node_env.production) {
                    yield app_1.confirm_up_app();
                }
            });
        },
        phpmyadmin() {
            return __awaiter(this, void 0, void 0, function* () {
                yield phpmyadmin_1.confirm_up_phpmyadmin();
            });
        },
    },
};
//# sourceMappingURL=hook.js.map