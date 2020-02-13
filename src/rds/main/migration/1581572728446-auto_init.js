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
class autoInit1581572728446 {
    constructor() {
        this.name = 'autoInit1581572728446';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("CREATE TABLE `state` (`id` int NOT NULL AUTO_INCREMENT, `time_create` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `time_update` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `data` json NULL, `key` varchar(255) NOT NULL, `value` mediumtext NULL, `type` enum ('common') NOT NULL DEFAULT 'common', `status` enum ('ok') NOT NULL DEFAULT 'ok', UNIQUE INDEX `IDX_d91d3318d449f5a3166951559e` (`key`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("DROP INDEX `IDX_d91d3318d449f5a3166951559e` ON `state`", undefined);
            yield queryRunner.query("DROP TABLE `state`", undefined);
        });
    }
}
exports.autoInit1581572728446 = autoInit1581572728446;
//# sourceMappingURL=1581572728446-auto_init.js.map