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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const invalid_argument_1 = require("../../../error/invalid_argument");
const lodash_1 = require("lodash");
const invalid_range_1 = require("../../../error/invalid_range");
const lack_argument_1 = require("../../../error/lack_argument");
const SelectQueryBuilder_1 = require("typeorm/query-builder/SelectQueryBuilder");
const str_1 = require("../../../util/str");
// Load custom query builder
load_scope();
/**
 * All entities should extends this class
 */
class Base extends typeorm_1.BaseEntity {
    fill(row) {
        for (let key in row) {
            this[key] = row[key];
        }
    }
    validate_enum_columns() {
        this.constructor.validate_enum_columns(this);
    }
    static max(column) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `max(${column})`;
            const r = yield this.createQueryBuilder()
                .select(key)
                .getRawOne();
            return r[key];
        });
    }
    static max_id(id_field = 'id') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.max(id_field);
        });
    }
    /**
     * Get list of records
     */
    static list(opt = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, take = 15, key_by } = opt;
            const skip = (page - 1) * take;
            const max = 50;
            if (take > max) {
                throw new invalid_argument_1.Invalid_argument({ take }, `Max constraint: ${max}`);
            }
            if (key_by) {
                const uniques = this.get_unique_columns();
                if (!uniques.includes(key_by)) {
                    throw new invalid_range_1.Invalid_range('key_by', uniques);
                }
            }
            opt.skip = skip;
            const r = yield this.findAndCount(opt);
            let list = r[0];
            if (opt.key_by) {
                list = lodash_1.keyBy(list, opt.key_by);
            }
            return {
                list,
                count: r[1],
            };
        });
    }
    static search(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            const { keywords } = opt;
            if (!keywords) {
                if (typeof opt === 'object') {
                    return this.search({ keywords: opt });
                }
                throw new lack_argument_1.Lack_argument('keywords');
            }
            if (!lodash_1.isArray(keywords)) {
                return this.search([keywords]);
            }
            const or = [];
            for (let it of keywords) {
                const and = {};
                for (let column in it) {
                    const keyword = it[column];
                    and[column] = typeorm_1.Like(keyword);
                }
                or.push(and);
            }
            opt.where = or;
            return this.list(opt);
        });
    }
    /**
     * Get all column names of a table
     * @returns {(keyof T)[]}
     */
    static get_column_names() {
        return this.get_columns().map(it => it.propertyName);
    }
    /**
     * Get column info of a table
     * @param opt
     */
    static get_columns(opt) {
        var _a;
        const columns = this.get_meta().columns;
        if (!((_a = opt) === null || _a === void 0 ? void 0 : _a.only)) {
            return columns;
        }
        return columns.map(it => lodash_1.pick(it, opt.only));
    }
    static get_unique_columns() {
        const meta = this.get_meta();
        const indices = meta.ownIndices.filter(it => it.isUnique && it.columns.length === 1).map(it => (it.columns[0].propertyName));
        const primary = meta.primaryColumns.map(it => it.propertyName);
        return [...indices, ...primary];
    }
    /**
     * Table structure brief
     */
    static brief() {
        return this.get_columns({ only: ['propertyName', 'type', 'enum', 'default', 'isPrimary', 'isNullable', 'isSelect'] });
    }
    /**
     * Get entity name
     * Equal to entity target class's name if target is set to table.
     * If target class is not then then it equals to table name.
     * @returns {string}
     */
    static get_name() {
        return this.get_meta().name;
    }
    /**
     * Get table name
     */
    static get_table() {
        return this.get_meta().tableName;
    }
    /**
     * Get entity metadata
     */
    static get_meta() {
        return this.getRepository().metadata;
    }
    /**
     * shortcut for createQueryBuilder()
     */
    static q(alias) {
        return this.createQueryBuilder(alias);
    }
    /**
     * Row exists or not
     * @param where
     */
    static exists(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield this.findOne({ where, select: ['id'] });
            return !!r;
        });
    }
    /**
     * validate enumerable columns
     * @param key
     * @param value
     */
    static validate_enum_columns(row) {
        const cols = this.get_columns();
        for (let it of cols) { // iterate each column
            if (it.type !== 'enum') {
                continue;
            }
            const key = it.propertyName;
            const value = row[key];
            if (lodash_1.isNil(value)) {
                continue;
            }
            // if is enum column and has value to set, check if value is
            // in enum set.
            if (!it.enum.includes(row[it.propertyName])) {
                throw new invalid_range_1.Invalid_range(key, it.enum);
            }
        }
    }
    /**
     * Clear expired data, depend on `duration` field
     */
    static clear_expired() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .createQueryBuilder()
                .where(`NOW() >= DATE_ADD(time_create, INTERVAL duration SECOND )`)
                .delete();
        });
    }
    /**
     * Validate `this` by validation annotations
     *
     * Write your own custom validation rules in sub class and
     * remember to call super validate.
     */
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.validate_enum_columns();
            const e = yield class_validator_1.validate(this);
            if (e.length) {
                throw new invalid_argument_1.Invalid_argument(e);
            }
        });
    }
    /**
     * Set json field
     *
     * @example
     * set_json('data', 'a.b.c', 1)
     */
    set_json(field, path, data) {
        const root = this[field] = (this[field] || {});
        lodash_1.set(root, path, data);
    }
    /**
     * Get from json field
     * @example
     * get_json('data', 'a.b.c')
     * @param field
     * @param path
     */
    get_json(field, path) {
        const root = this[field];
        return lodash_1.get(root, path);
    }
    /**
     * Helper for set_json('data', ...)
     * @param field
     * @param path
     * @param data
     */
    set_data(path, data) {
        this.set_json('data', path, data);
    }
    /**
     * Helper for get_json('data', ...)
     * @param path
     */
    get_data(path) {
        this.get_json('data', path);
    }
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.IsOptional(),
    typeorm_1.PrimaryGeneratedColumn()
], Base.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' })
], Base.prototype, "time_create", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp' })
], Base.prototype, "time_update", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true })
], Base.prototype, "data", void 0);
__decorate([
    typeorm_1.BeforeUpdate(),
    typeorm_1.BeforeInsert()
], Base.prototype, "validate", null);
exports.Base = Base;
/**
 * todo: FIX THIS IN THE FUTURE.
 * todo: The path and value should be  parameterized but:
 * https://github.com/typeorm/typeorm/issues/5455
 */
function load_scope() {
    SelectQueryBuilder_1.SelectQueryBuilder.prototype.q_where_json = function (full_path, value, operator = '=', and = true) {
        const { field, path } = parse_compact_json_path(full_path);
        const sql = `${field} -> "$${path}" ${operator} ${JSON.stringify(value)}`;
        return this[(and ? 'and' : 'or') + 'Where'](sql, { /* todo: parameters should be here*/});
    };
    /**
     * todo: FIX THIS IN THE FUTURE.
     * todo: The path and value should be  parameterized but:
     * https://github.com/typeorm/typeorm/issues/5455
     */
    SelectQueryBuilder_1.SelectQueryBuilder.prototype.q_where_json_empty = function (full_path, is_empty = true, and = true) {
        const { field, path } = parse_compact_json_path(full_path);
        const field_part = `${field} -> "$${path}"`;
        let sql;
        if (is_empty) {
            sql = `${field_part} is null or ${field_part} = cast('null' as json)`;
        }
        else {
            sql = `${field_part} is not null and ${field_part} != cast('null' as json)`;
        }
        return this[(and ? 'and' : 'or') + 'Where'](sql, { /*todo: parameters should be here*/});
    };
    /**
     * todo: FIX THIS IN THE FUTURE.
     * todo: The path and value should be  parameterized but:
     * https://github.com/typeorm/typeorm/issues/5455
     */
    SelectQueryBuilder_1.SelectQueryBuilder.prototype.q_where_json_contains = function (full_path, value, and = true) {
        const { field, path } = parse_compact_json_path(full_path);
        const sql = `json_contains(\`${field}\` -> '$${path}', '${JSON.stringify(value)}')`;
        return this[(and ? 'and' : 'or') + 'Where'](sql, { /*todo: parameters should be here*/});
    };
    SelectQueryBuilder_1.SelectQueryBuilder.prototype.q_and_where_json_is_empty = function (full_path) {
        return this.q_where_json_empty(full_path, true, true);
    };
    SelectQueryBuilder_1.SelectQueryBuilder.prototype.q_or_where_json_is_empty = function (full_path) {
        return this.q_where_json_empty(full_path, true, false);
    };
    SelectQueryBuilder_1.SelectQueryBuilder.prototype.q_and_where_json_is_not_empty =
        function (full_path) {
            return this.q_where_json_empty(full_path, false, true);
        };
    SelectQueryBuilder_1.SelectQueryBuilder.prototype.q_or_where_json_is_not_empty = function (full_path) {
        return this.q_where_json_empty(full_path, false, false);
    };
    SelectQueryBuilder_1.SelectQueryBuilder.prototype.q_or_where_json = function (full_path, value, operator = '=') {
        return this.q_where_json(full_path, value, operator, false);
    };
    SelectQueryBuilder_1.SelectQueryBuilder.prototype.q_and_where_json = function (full_path, value, operator = '=') {
        return this.q_where_json(full_path, value, operator, true);
    };
}
exports.load_scope = load_scope;
/**
 * 'a.b.c.d' ==> {field: 'a', path: '.b.c.d'}
 * 'a[1][2].d' ==> {field: 'a', path: '[1][2].d'}
 * @param full - full path
 */
function parse_compact_json_path(full) {
    if (!full) {
        throw new invalid_argument_1.Invalid_argument({ path: full });
    }
    for (let i = 0; i < full.length; i++) {
        const it = full[i];
        if (['.', '['].includes(it)) {
            const arr = str_1.str_split_at(full, i);
            return { field: arr[0], path: arr[1] };
        }
    }
    return { field: full, path: '' };
}
exports.parse_compact_json_path = parse_compact_json_path;
exports.FIELD_DATA = 'data';
//# sourceMappingURL=base.js.map