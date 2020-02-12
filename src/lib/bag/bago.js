"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_1 = require("@mosteast/e");
const lodash_1 = require("lodash");
const type_1 = require("../../error/type");
const bag_1 = require("./bag");
/**
 * Bag out
 *
 * Response payload
 */
class Bago extends bag_1.Bag {
    constructor(a, b) {
        super();
        if (a instanceof Error) {
            this.ok = false;
            if (a instanceof e_1.E && a.level === type_1.E_level.external) {
                this.error = lodash_1.pick(a, ['eid', 'message', 'solution', 'data', 'name']);
            }
            else {
                this.error = {};
                this.error.message = 'Internal error occurred, we have logged this down and we will act on it soon, if this issue concerns you, please contact us.';
            }
            this.data = b;
        }
        else {
            this.ok = true;
            if (a) {
                this.data = a;
            }
        }
    }
}
exports.Bago = Bago;
//# sourceMappingURL=bago.js.map