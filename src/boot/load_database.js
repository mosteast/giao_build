"use strict";
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
const rds_1 = require("../rds/rds");
const base_1 = require("../rds/main/entity/base");
const logger_1 = require("../logger/logger");
function load_database() {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.info('* load_database');
        const con = yield rds_1.database();
        base_1.Base.useConnection(con);
    });
}
exports.load_database = load_database;
function after_start_mysql() {
    return __awaiter(this, void 0, void 0, function* () {
        yield rds_1.wait_mysql();
        yield rds_1.ensure_databases();
        yield rds_1.create_readonly_user();
        yield rds_1.generate_migrations();
        yield rds_1.run_migrations();
    });
}
exports.after_start_mysql = after_start_mysql;
//# sourceMappingURL=load_database.js.map