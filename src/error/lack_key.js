"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = require("./base_error");
const lodash_1 = require("lodash");
const str_1 = require("../util/str");
class Lack_key extends base_error_1.Base_error {
    constructor(keys, b, msg_append) {
        var _a;
        super();
        let solution = 'Pass these keys and try again.', received, msg;
        const required = [];
        const required_set = [];
        if (lodash_1.isString(keys)) {
            this.message = msg;
        }
        else {
            for (let it of keys) {
                if (lodash_1.isString(it)) {
                    required.push(it);
                }
                else {
                    required_set.push(it);
                }
            }
            const sub = required_set.length
                ? `, required sets: ${required_set.map(it => str_1.str_args_nest(it)).join(', ')}`
                : '';
            if (msg_append) {
                msg_append += ' ';
            }
            this.message = `${msg_append}Required: ${str_1.str_args(required)}${sub}`;
            this.data = {
                required_set,
                required_keys: required,
                received_keys: received && (_a = Object.keys(received), (_a !== null && _a !== void 0 ? _a : [])),
            };
        }
        if (lodash_1.isString(b)) {
            this.solution = b;
        }
        else {
            this.data.received = b;
        }
    }
}
exports.Lack_key = Lack_key;
//# sourceMappingURL=lack_key.js.map