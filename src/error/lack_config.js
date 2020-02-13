"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const common_eid_1 = require("@mosteast/common_eid");
const lack_key_1 = require("./lack_key");
class Lack_config extends lack_key_1.Lack_key {
    constructor(keys, b) {
        super(keys, b, 'Some configurations are missing.');
        this.eid = common_eid_1.EID_common.lack_argument;
        this.level = type_1.E_level.internal;
    }
}
exports.Lack_config = Lack_config;
//# sourceMappingURL=lack_config.js.map