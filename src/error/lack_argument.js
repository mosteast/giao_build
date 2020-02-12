"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const common_eid_1 = require("@mosteast/common_eid");
const lack_key_1 = require("./lack_key");
class Lack_argument extends lack_key_1.Lack_key {
    constructor(keys, b) {
        super(keys, b, 'Some arguments are missing.');
        this.eid = common_eid_1.EID_common.lack_argument;
        this.level = type_1.E_level.internal;
    }
}
exports.Lack_argument = Lack_argument;
class Lack_argument_external extends Lack_argument {
    constructor() {
        super(...arguments);
        this.level = type_1.E_level.external;
        this.status_code = 403;
    }
}
exports.Lack_argument_external = Lack_argument_external;
//# sourceMappingURL=lack_argument.js.map