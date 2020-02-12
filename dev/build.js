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
const lifecycle_1 = require("./lib/app/lifecycle");
const root_1 = require("../root");
const inquirer = require("inquirer");
const shelljs_1 = require("shelljs");
const yargs = require("yargs");
const print_helper_1 = require("@mosteast/print_helper");
const docker_compose_1 = require("./lib/docker/docker_compose");
yargs
    .command({
    command: '$0 [--yes|-y]',
    builder(argv) {
        return argv.options({
            yes: {
                type: 'boolean',
                alias: 'y',
                default: false,
                desc: 'Auto yes to continue all following steps',
            },
        });
    },
    handler(args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield lifecycle_1.build_app();
            let confirm_build_containers;
            if (args.yes) {
                confirm_build_containers = true;
            }
            else {
                print_helper_1.print_info('Add `-y` flag to auto-continue all building steps');
                const q = yield inquirer.prompt({
                    name: 'build_containers',
                    type: 'confirm',
                    message: `
Build containers now?
Make sure .env file is configured in build directory too.`,
                });
                confirm_build_containers = q.build_containers;
            }
            if (confirm_build_containers) {
                shelljs_1.cd(root_1.path_build());
                yield docker_compose_1.build_containers();
            }
        });
    },
}).argv;
//# sourceMappingURL=build.js.map