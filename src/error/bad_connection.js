"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = require("./base_error");
const common_eid_1 = require("@mosteast/common_eid");
class Bad_connection extends base_error_1.Base_error {
    constructor(title, solution) {
        super(title, solution);
        this.eid = common_eid_1.EID_common.bad_connection;
    }
}
exports.Bad_connection = Bad_connection;
//# sourceMappingURL=bad_connection.js.map