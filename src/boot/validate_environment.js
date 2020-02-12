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
const env_1 = require("../../env");
/**
 * Validate app level environment
 */
function validate_environment() {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_verbose('* validate_environment');
        env_1.validate_envs();
    });
}
exports.validate_environment = validate_environment;
//# sourceMappingURL=validate_environment.js.map