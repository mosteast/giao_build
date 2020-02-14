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
const command_1 = require("@mosteast/command");
const print_helper_1 = require("@mosteast/print_helper");
const chalk = require("chalk");
const docker_compose_1 = require("docker-compose");
const exfy_1 = require("exfy");
const fs_extra_1 = require("fs-extra");
const FileSync = require("lowdb/adapters/FileSync");
const shelljs_1 = require("shelljs");
const env_1 = require("../../../env");
const root_1 = require("../../../root");
const constant_1 = require("../../../src/constant");
const fs_1 = require("../../util/fs");
const path_1 = require("../../util/path");
const docker_compose_2 = require("../docker/docker_compose");
const hook_1 = require("../docker/hook");
const util_1 = require("../docker/util");
const lowdb = require("lowdb/lib/main");
let state;
/**
 * Build project code to build directory
 */
function build_app() {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_verbose('* build_app');
        fs_1.confirm_env_file();
        env_1.validate_envs();
        prepare_environment();
        backup_git();
        yield compile();
        copy_requirements();
        edit_config();
        yield exfy_1.exfy({ paths: [root_1.path_build('bin')] }, { wd: root_1.path_build() });
        get_build_state();
        print_helper_1.print_success('* build_app complete');
    });
}
exports.build_app = build_app;
function prepare_environment() {
    process.env.NODE_ENV = env_1.N_node_env.production;
}
function compile() {
    return __awaiter(this, void 0, void 0, function* () {
        fs_extra_1.ensureDirSync(path_1.b());
        yield command_1.command('npx tsc');
    });
}
function copy_requirements() {
    // Copy Directories
    fs_extra_1.copySync(path_1.r('bin'), path_1.b('bin'));
    fs_extra_1.copySync(path_1.r('public'), path_1.b('public'));
    fs_extra_1.copySync(path_1.r('src/view'), path_1.b('src/view'));
    fs_extra_1.copySync(path_1.r('Dockerfile.sh'), path_1.b('Dockerfile.sh'));
    // Copy Files
    fs_extra_1.copySync(path_1.r(constant_1.N_file_dockerfile), path_1.b(constant_1.N_file_dockerfile));
    fs_extra_1.copySync(path_1.r(constant_1.N_file_dc_prod), path_1.b(constant_1.N_file_dc));
    fs_extra_1.copySync(path_1.r('.env.example'), path_1.b('.env.example'));
    fs_extra_1.copySync(path_1.r('.gitignore'), path_1.b('.gitignore'));
    fs_extra_1.copySync(path_1.r('.dockerignore'), path_1.b('.dockerignore'));
    fs_extra_1.copySync(path_1.r('tsconfig.json'), path_1.b('tsconfig.json'));
    // Copy ormconfig.js
    fs_extra_1.copySync(path_1.r('src/rds/main/ormconfig.js'), path_1.b('src/rds/main/ormconfig.js'));
}
function edit_config() {
    const json = require(path_1.r('./package.json'));
    delete json.files;
    json.main = 'index.js';
    json.type = 'index.d.ts';
    fs_extra_1.writeFileSync(root_1.path_root('build/package.json'), JSON.stringify(json));
}
function backup_git() {
    const tmp_path = path_1.r('tmp');
    const git_path = path_1.b('.git');
    const git_backup_path = `${tmp_path}/.git_tmp_backup`;
    if (fs_extra_1.pathExistsSync(git_path)) {
        shelljs_1.mkdir('-p', tmp_path);
        shelljs_1.mv(git_path, git_backup_path);
        shelljs_1.mv(git_backup_path, git_path);
        fs_extra_1.copySync(path_1.r('.gitignore'), path_1.b('.gitignore'));
    }
}
/**
 * Create or get build state object and it's corresponding file
 * this file only exist in build directory and contains information
 * about latest build.
 */
function get_build_state() {
    if (state) {
        return state;
    }
    const path = path_1.b('build_state.json');
    shelljs_1.touch(path);
    const adapter = new FileSync(path_1.b(path));
    state = lowdb(adapter);
    state.defaults({
        time_create: Date.now(),
    })
        .write();
}
function start(opt) {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_verbose('* Start');
        const node_env = env_1.get_node_env();
        const is_production = node_env === 'production';
        util_1.confirm_production_dir();
        env_1.validate_envs();
        print_helper_1.print_verbose('NODE_ENV:', node_env);
        opt = yield docker_compose_2.build_opt_dc(opt);
        let { services, build, config } = opt;
        print_helper_1.print_info(`Using config: ${config}`);
        const dcc = yield docker_compose_2.parse_dc_config(config);
        const all_services = Object.keys(dcc.services);
        print_helper_1.print_verbose(`All services defined: ${services.join(' ')}`);
        services = services.length ? services : all_services;
        if (build) {
            yield docker_compose_1.buildMany(services, opt);
        }
        is_production
            ? print_helper_1.print_info(`Service ${constant_1.N_app_name} will be running in container in production mode.`)
            : print_helper_1.print_info(`Service ${constant_1.N_app_name} will be running in code base in dev watch mode (instead of inside container).`);
        print_helper_1.print_info(`\nStarting services:\n${services.length ? services.map(it => ' - ' + it).join('\n') : '(Empty)'}`);
        for (let it of services) {
            const fn = hook_1.hook.before_start[it];
            if (fn instanceof Function) {
                yield fn({ dcc });
            }
        }
        // Start containers.
        yield docker_compose_1.upMany(services, opt).catch(console.log);
        yield docker_compose_1.logs(services, opt).catch(console.log);
        print_helper_1.print_info(`\nRun ${chalk.cyan('docker-compose logs -tf')} to see live docker logs.`);
        for (let it of services) {
            const fn = hook_1.hook.after_start[it];
            if (fn instanceof Function) {
                yield fn({ dcc });
            }
        }
        // If not production just run it in host machine
        if (!is_production) {
            // await confirm_up_phpadmin()
            yield command_1.command('npm run dev:start');
        }
    });
}
exports.start = start;
function stop(opt) {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_verbose('* Stop');
        util_1.confirm_production_dir();
        fs_1.confirm_env_file();
        env_1.validate_envs();
        yield docker_compose_1.down(yield docker_compose_2.build_opt_dc(Object.assign({ commandOptions: ['--remove-orphans'] }, opt)));
        print_helper_1.print_success('docker-compose is down.\n');
    });
}
exports.stop = stop;
//# sourceMappingURL=lifecycle.js.map