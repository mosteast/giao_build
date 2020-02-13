"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const base_error_1 = require("./base_error");
const type_1 = require("./type");
const common_eid_1 = require("@mosteast/common_eid");
const lodash_1 = require("lodash");
const message_1 = require("./util/message");
class Invalid_argument extends base_error_1.Base_error {
    constructor(a, b) {
        super();
        this.eid = common_eid_1.EID_common.invalid_argument;
        const ta = typeof a, tb = typeof b;
        // Simple string error.
        if (ta === 'string' && tb === 'string') {
            this.message = a;
            this.solution = b;
        }
        else if (lodash_1.isArray(a) && a[0] instanceof class_validator_1.ValidationError) {
            const keys = [];
            const reasons = {};
            a.forEach(it => {
                keys.push(it.property);
                reasons[it.property] = {
                    value: it.value,
                    constraints: it.constraints,
                };
            });
            this.message = `Invalid arguments: {${keys.join(', ')}}.`;
            this.solution = 'Checkout {data.invalid_reasons} and try again.';
            this.data = {
                invalid_keys: keys,
                invalid_reasons: reasons,
            };
        }
        else if (typeof a === 'object' && (!b || typeof b === 'string')) {
            let message = 'Invalid arguments: ';
            message += message_1.invalid_map(a);
            this.message = lodash_1.trim(message, ', ');
            this.solution = b;
        }
        else { // Object error with more info.
            let keys = [], reasons = {};
            if (typeof a === 'string') {
                keys.push(a);
                reasons[a] = b;
                reasons[a].key = a;
            }
            else {
                throw new Error(`Invalid argument ${JSON.stringify(arguments)} for Error ${this.eid}`);
            }
            this.message = `Invalid arguments: {${keys.join(', ')}}.`;
            this.solution = 'Checkout {data.invalid_reasons} and try again.';
            this.data = {
                invalid_keys: keys,
                invalid_reasons: reasons,
            };
        }
    }
}
exports.Invalid_argument = Invalid_argument;
/**
 * Api error shortcut
 */
class Invalid_argument_external extends Invalid_argument {
    constructor() {
        super(...arguments);
        this.level = type_1.E_level.external;
        this.status_code = 403;
    }
}
exports.Invalid_argument_external = Invalid_argument_external;
//# sourceMappingURL=invalid_argument.js.map