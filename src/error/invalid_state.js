"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_eid_1 = require("@mosteast/common_eid");
const base_error_1 = require("./base_error");
const type_1 = require("./type");
class Invalid_state extends base_error_1.Base_error {
    constructor() {
        super(...arguments);
        this.eid = common_eid_1.EID_common.invalid_state;
    }
}
exports.Invalid_state = Invalid_state;
class Invalid_state_external extends Invalid_state {
    constructor() {
        super(...arguments);
        this.level = type_1.E_level.external;
        this.status_code = 400;
    }
}
exports.Invalid_state_external = Invalid_state_external;
//# sourceMappingURL=invalid_state.js.map