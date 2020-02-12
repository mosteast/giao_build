"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_eid_1 = require("@mosteast/common_eid");
const invalid_configuration_1 = require("./invalid_configuration");
class Invalid_environment_variable extends invalid_configuration_1.Invalid_configuration {
    constructor() {
        super(...arguments);
        this.eid = common_eid_1.EID_common.invalid_environment_variable;
    }
}
exports.Invalid_environment_variable = Invalid_environment_variable;
//# sourceMappingURL=invalid_environment_variable.js.map