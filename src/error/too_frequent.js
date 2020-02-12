"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_eid_1 = require("@mosteast/common_eid");
const base_error_1 = require("./base_error");
const type_1 = require("./type");
class Too_frequent extends base_error_1.Base_error {
    constructor() {
        super(...arguments);
        this.eid = common_eid_1.EID_common.too_frequent;
    }
}
exports.Too_frequent = Too_frequent;
class Too_frequent_external extends Too_frequent {
    constructor() {
        super(...arguments);
        this.level = type_1.E_level.external;
        this.status_code = 429;
    }
}
exports.Too_frequent_external = Too_frequent_external;
//# sourceMappingURL=too_frequent.js.map