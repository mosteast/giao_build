"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_1 = require("@mosteast/e");
const type_1 = require("./type");
const common_eid_1 = require("@mosteast/common_eid");
/**
 * Project base error
 *
 * All custom errors should extend this error.
 */
class Base_error extends e_1.E {
    constructor() {
        super(...arguments);
        this.eid = common_eid_1.EID_common.base_error;
        this.level = type_1.E_level.internal;
        /**
         * Whether error should be logged
         */
        this.log = false;
    }
}
exports.Base_error = Base_error;
//# sourceMappingURL=base_error.js.map