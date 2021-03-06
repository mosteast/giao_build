"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
/**
 * Serialize invalid map
 *
 * From:
 * { name: 'wrong_name', age: 'wrong_age' }
 * to:
 * "name='wrong_name', age='wrong_age'"
 *
 * @param map
 */
function invalid_map(map) {
    let partial = '';
    for (let key in map) {
        partial += `${key}=${JSON.stringify(map[key])}, `;
    }
    return lodash_1.trim(partial, ', ');
}
exports.invalid_map = invalid_map;
//# sourceMappingURL=message.js.map