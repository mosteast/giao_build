"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = require("./base_error");
const common_eid_1 = require("@mosteast/common_eid");
class Lack_path extends base_error_1.Base_error {
    constructor(title, solution) {
        super(title, solution);
        this.eid = common_eid_1.EID_common.lack_path;
    }
}
exports.Lack_path = Lack_path;
//# sourceMappingURL=lack_path.js.map