"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = require("./base_error");
const common_eid_1 = require("@mosteast/common_eid");
const type_1 = require("./type");
/**
 * Invalid_argument helper
 */
class Invalid_range extends base_error_1.Base_error {
    constructor(key, range, solution) {
        super();
        this.eid = common_eid_1.EID_common.invalid_argument;
        this.message = `Invalid argument: {${key}}, value should be in range: ${JSON.stringify(range)}`;
        this.solution = solution;
    }
}
exports.Invalid_range = Invalid_range;
class Invalid_range_external extends Invalid_range {
    constructor() {
        super(...arguments);
        this.level = type_1.E_level.external;
        this.status_code = 403;
    }
}
exports.Invalid_range_external = Invalid_range_external;
//# sourceMappingURL=invalid_range.js.map