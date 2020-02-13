"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_state_1 = require("./invalid_state");
class Not_cache_entity extends invalid_state_1.Invalid_state {
    constructor(message = `Current entity is not a cache entity, enable cache by config \`static.cache\` property on entity instead of \`false\``) {
        super(message);
    }
}
exports.Not_cache_entity = Not_cache_entity;
//# sourceMappingURL=not_cache_entity.js.map