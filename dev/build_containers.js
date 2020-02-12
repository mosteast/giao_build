#!/usr/bin/env ts-node
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
const docker_compose_1 = require("./lib/docker/docker_compose");
require('yargs').command({
    command: '$0 [--service|-s]',
    builder(argv) {
        return argv.options({
            service: {
                alias: 's',
                type: 'array',
            },
        });
    },
    handler(args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield docker_compose_1.build_containers(args);
        });
    },
}).argv;
//# sourceMappingURL=build_containers.js.map