"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var State_1;
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const base_1 = require("./base");
var T;
(function (T) {
    T["common"] = "common";
})(T || (T = {}));
exports.N_type_state = T;
var S;
(function (S) {
    S["ok"] = "ok";
})(S || (S = {}));
exports.N_status_state = S;
let State = State_1 = class State extends base_1.Base {
    /**
     * Get state
     * @param {string} key
     * @returns {Promise<T>}
     */
    static get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const o = yield this.findOne({ where: { key } });
            if (o === undefined) {
                return null;
            }
            return JSON.parse(o.value);
        });
    }
    /**
     * Set state
     * @param {string} key
     * @param value
     * @param {T} type
     * @param {S} status
     * @returns {Promise<State>}
     */
    static set(key, value, type = T.common, status = S.ok) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let row = (_a = yield State_1.findOne({ where: { key } }), (_a !== null && _a !== void 0 ? _a : State_1.create({ key })));
            if (value === undefined) {
                value = null;
            }
            row.value = JSON.stringify(value);
            row.type = type;
            row.status = status;
            return row.save();
        });
    }
};
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(64),
    typeorm_1.Column('varchar', { unique: true, nullable: false })
], State.prototype, "key", void 0);
__decorate([
    typeorm_1.Column('mediumtext', { nullable: true })
], State.prototype, "value", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: T, default: T.common })
], State.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: S, default: S.ok })
], State.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'json' })
], State.prototype, "data", void 0);
State = State_1 = __decorate([
    typeorm_1.Entity()
], State);
exports.State = State;
//# sourceMappingURL=state.js.map