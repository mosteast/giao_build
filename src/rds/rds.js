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
const lodash_1 = require("lodash");
const typeorm_1 = require("typeorm");
const cmd_1 = require("waitcha/lib/commands/cmd");
const env_1 = require("../../env");
const root_1 = require("../../root");
const invalid_argument_1 = require("../error/invalid_argument");
const redis_1 = require("../redis/redis");
/**
 * Connection name
 */
var N_connection;
(function (N_connection) {
    N_connection["main"] = "main";
    N_connection["main_test"] = "main_test";
})(N_connection = exports.N_connection || (exports.N_connection = {}));
exports.connection_redis = {
    main: {
        host: env_1.env(env_1.__.host_redis_main) || '127.0.0.1',
        port: parseInt(env_1.env(env_1.__.port_redis_main)) || 6379,
        db: parseInt(env_1.env(env_1.__.redis_main_db)) || 0,
    },
    main_test: {
        host: env_1.env(env_1.__.host_redis_main_test) || '127.0.0.1',
        port: parseInt(env_1.env(env_1.__.port_redis_main_test)) || 6380,
        db: parseInt(env_1.env(env_1.__.redis_main_test_db)) || 0,
    },
};
/**
 * This map contains all database connection options
 *
 * Typically, each type of connection ('main' or
 * 'my_other_connection') should have a "test" connection with a
 * suffix '_test' to its connection name.
 *
 * Test connection will be used automatically when NODE_ENV ===
 * 'testing'
 */
const _opts = prepare_opts({
    main: {
        type: env_1.env(env_1.__.rds_main_type),
        host: env_1.env(env_1.__.host_rds_main),
        port: parseInt(env_1.env(env_1.__.port_rds_main)) || 3306,
        username: env_1.env(env_1.__.rds_main_username),
        password: env_1.env(env_1.__.rds_main_password),
        database: env_1.env(env_1.__.rds_main_database),
        synchronize: false,
        logging: !!env_1.env(env_1.__.db_print) || ['error', 'warn'],
        migrationsTableName: 'migration',
        entities: [
            root_1.path_root('src/rds/main/entity/**/*.{ts,js}'),
        ],
        migrations: [
            root_1.path_root('src/rds/main/migration/**/*.{ts,js}'),
        ],
        subscribers: [
            root_1.path_root('src/rds/main/subscriber/**/*.{ts,js}'),
        ],
        cli: {
            entitiesDir: root_1.path_root_relative('src/rds/main/entity'),
            migrationsDir: root_1.path_root_relative('src/rds/main/migration'),
            subscribersDir: root_1.path_root_relative('src/rds/main/subscriber'),
        },
        cache: {
            type: 'ioredis',
            options: {
                port: exports.connection_redis.main.port,
                host: exports.connection_redis.main.host,
                db: exports.connection_redis.main.db,
            },
        },
    },
    main_test: {
        type: env_1.env(env_1.__.rds_main_test_type),
        host: env_1.env(env_1.__.host_redis_main_test),
        port: parseInt(env_1.env(env_1.__.port_rds_main_test)) || 3306,
        username: env_1.env(env_1.__.rds_main_test_username),
        password: env_1.env(env_1.__.rds_main_test_password),
        database: env_1.env(env_1.__.rds_main_test_database),
        synchronize: true,
        logging: !!env_1.env(env_1.__.db_print) || ['error', 'warn'],
        migrationsTableName: 'migration',
        entities: [
            root_1.path_root('src/rds/main/entity/**/*.{ts,js}'),
        ],
        migrations: [
            root_1.path_root('src/rds/main/migration/**/*.{ts,js}'),
        ],
        subscribers: [
            root_1.path_root('src/rds/main/subscriber/**/*.{ts,js}'),
        ],
        cli: {
            entitiesDir: root_1.path_root_relative('src/rds/main/entity'),
            migrationsDir: root_1.path_root_relative('src/rds/main/migration'),
            subscribersDir: root_1.path_root_relative('src/rds/main/subscriber'),
        },
        cache: {
            type: 'ioredis',
            options: {
                port: exports.connection_redis.main_test.port,
                host: exports.connection_redis.main_test.host,
                db: exports.connection_redis.main_test.db,
            },
        },
    },
});
/**
 * Export for outside use
 */
exports.connection_opts = Object.freeze(_opts);
/**
 * Get or create connection
 *
 * @param connection_name
 */
function database(connection_name = N_connection.main) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = connection_name;
        let con;
        if (env_1.env(env_1.__.NODE_ENV) === env_1.N_node_env.testing) {
            name = (name + '_test');
        }
        try {
            con = typeorm_1.getConnection(name);
        }
        catch (e) {
            const opt = _opts[name];
            print_helper_1.print_verbose(`Create ${opt.type} connection "${name}"`);
            yield wait_mysql(name);
            yield ensure_databases(name);
            con = yield typeorm_1.createConnection(opt).catch(e => {
                print_helper_1.print_error(`Fail to connect to ${opt.type}, config:`);
                print_helper_1.print_error(lodash_1.pick(opt, ['name', 'type', 'host', 'port', 'username', 'database', 'synchronize', 'logging', 'cache']));
                throw e;
            });
        }
        return con;
    });
}
exports.database = database;
/**
 * Create necessary databases if not exist
 * @param opt
 */
function ensure_databases(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!connection) {
            connection = N_connection.main;
        }
        print_helper_1.print_info('* ensure_databases');
        const opt = _opts[connection];
        const database = opt.database;
        const o = lodash_1.cloneDeep(opt);
        // todo: typeorm bug
        // typeorm insist to pass a database name, otherwise it throws
        // error.
        o.database = 'mysql';
        o.name = 'tmp';
        const con = yield typeorm_1.createConnection(o);
        yield con.query(`CREATE DATABASE IF NOT EXISTS ??`, [database]);
        yield con.close();
    });
}
exports.ensure_databases = ensure_databases;
/**
 * Prepare connection options for typeorm to load correctly
 * @param map
 */
function prepare_opts(map) {
    // Set connection 'name' property to its key name
    for (let name in map) {
        const it = map[name];
        if (!it.database) {
            if (name.endsWith('_test')) {
                print_helper_1.print_verbose(`Testing RDS ${name} is not properly configured.`);
            }
            else {
                print_helper_1.print_warn(`It seems RDS "${name}" is not properly configured, configurations:\n`, it);
            }
            continue;
        }
        // @ts-ignore
        it.name = name;
    }
    return map;
}
var N_database_type;
(function (N_database_type) {
    N_database_type["mysql"] = "mysql";
    N_database_type["mariadb"] = "mariadb";
})(N_database_type = exports.N_database_type || (exports.N_database_type = {}));
function validate_mysql_connection() {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_info('** validate_mysql_connection');
        yield database().catch(e => {
            print_helper_1.print_error('Can not connect to MySQL.');
            throw e;
        });
    });
}
exports.validate_mysql_connection = validate_mysql_connection;
function validate_redis_connection() {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_info('** validate_redis_connection');
        yield redis_1.redis().catch(e => {
            print_helper_1.print_error('Can not connect to Redis.');
            throw e;
        });
    });
}
exports.validate_redis_connection = validate_redis_connection;
function wait_mysql(connection = N_connection.main) {
    return __awaiter(this, void 0, void 0, function* () {
        const opt = _opts[connection];
        if (!opt) {
            throw new invalid_argument_1.Invalid_argument({ name: connection });
        }
        const command = `mysql -u${opt.username} -p${opt.password} -h${opt.host} -P${opt.port} -e 'show databases'`;
        yield cmd_1.default.run(['-r', '30', '--mute', command]);
    });
}
exports.wait_mysql = wait_mysql;
function generate_migrations(file = 'auto_init', connection) {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_info('** generate_migrations');
        yield typeorm(`migration:generate -- -n ${file}`, connection);
    });
}
exports.generate_migrations = generate_migrations;
function run_migrations(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_info('** run_migrations');
        yield typeorm(`migration:run`, connection);
    });
}
exports.run_migrations = run_migrations;
function create_readonly_user(connection = N_connection.main, opt) {
    return __awaiter(this, void 0, void 0, function* () {
        print_helper_1.print_info('** create_readonly_user');
        const { username, password, table, host } = opt = Object.assign({ database: '*', table: '*', host: '%', username: env_1.env(env_1.__.rds_readonly_user_username), password: env_1.env(env_1.__.rds_readonly_user_password) }, opt);
        const db = yield database(connection);
        yield db.query('CREATE USER IF NOT EXISTS ?@"%" IDENTIFIED WITH mysql_native_password BY ?', [username, password]);
        yield db.query(`GRANT SELECT ON ${opt.database}.${table} TO ?@?`, [username, host]);
        yield db.query('FLUSH PRIVILEGES;');
    });
}
exports.create_readonly_user = create_readonly_user;
/**
 * run typeorm command
 */
function typeorm(partial, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!connection) {
            connection = N_connection.main;
        }
        let runner;
        if (env_1.get_node_env() === env_1.N_node_env.production) {
            runner = 'npx typeorm';
        }
        else {
            runner = 'npx ts-node -r ./tsconfig.json ./node_modules/.bin/typeorm';
        }
        const config_path = root_1.path_root_relative(`src/rds/${connection}/ormconfig.js`);
        yield command_1.command(`${runner} --config ${config_path} --connection ${connection} migration:run ${partial}`)
            .catch(e => { throw e; });
    });
}
exports.typeorm = typeorm;
//# sourceMappingURL=rds.js.map