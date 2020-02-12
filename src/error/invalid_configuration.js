"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_eid_1 = require("@mosteast/common_eid");
const invalid_state_1 = require("./invalid_state");
const message_1 = require("./util/message");
class Invalid_configuration extends invalid_state_1.Invalid_state {
    constructor(a, b) {
        super();
        this.eid = common_eid_1.EID_common.invalid_configuration;
        this.message = typeof a === 'string' ?
            a : `Invalid configurations: ${message_1.invalid_map(a)}`;
        this.solution = b;
    }
}
exports.Invalid_configuration = Invalid_configuration;
//# sourceMappingURL=invalid_configuration.js.map