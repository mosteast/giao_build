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
const bag_1 = require("./lib/helper/bag");
const geoip_lite_1 = require("geoip-lite");
const invalid_argument_1 = require("./error/invalid_argument");
const config_1 = require("./config");
const fs_1 = require("./util/fs");
const rds_1 = require("./rds/rds");
const print_helper_1 = require("@mosteast/print_helper");
const env_1 = require("../env");
function load_routes(server) {
    print_helper_1.print_verbose('* load_routes');
    // Home
    server.get('/', (i, o) => __awaiter(this, void 0, void 0, function* () {
        return bag_1.bago({ yo: 'world' });
    }));
    // Current time (support both get and post)
    server.gest('/now', (i, o) => __awaiter(this, void 0, void 0, function* () {
        return bag_1.bago({ time: Date.now() });
    }));
    // View support
    server.gest('/view', (i, o) => __awaiter(this, void 0, void 0, function* () {
        // Template directory defined in point-of-view plugin options.
        o.view('test.ejs', { name: 'world' });
    }));
    // View support
    server.gest('/log/:type', (i, o) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const compare = env_1.env(env_1.__.app_log_password);
        const password = i.input('password');
        if (!compare || password !== compare) {
            throw new invalid_argument_1.Invalid_argument_external({ password });
        }
        const type = i.params.type;
        const path = (_a = config_1.$.log[type]) === null || _a === void 0 ? void 0 : _a.path;
        if (i.input('clear')) {
            yield fs_1.file_clear(path);
            o.send(bag_1.bago());
        }
        o.file(path, 'text/plain');
    }));
    // geo ip lookup
    server.gest('/geoip', (i, o) => __awaiter(this, void 0, void 0, function* () {
        const geo = geoip_lite_1.lookup('104.245.9.238');
        return bag_1.bago({ geo });
    }));
    // Websocket
    server.get('/ws', { websocket: true }, (connection, i, params) => __awaiter(this, void 0, void 0, function* () {
        connection.setEncoding('utf8');
        connection.write(`Yo.`);
        connection.socket.on('message', message => {
            connection.socket.send(JSON.stringify({ echo_back: message }));
        });
    }));
    // REST with Websocket
    server.route({
        method: 'GET',
        url: '/super',
        /**
         * Handle http requests
         * @param req
         * @param res
         */
        handler(i, o) {
            o
                .header('Access-Control-Allow-Origin', '*') // For direct
                // test in
                // browser
                .send({ yo: 'world' });
        },
        /**
         * Handle WebSockets connections
         * @param connection
         * @param req
         */
        wsHandler(connection, i, params) {
            connection.setEncoding('utf8');
            connection.socket.on('message', message => {
                connection.socket.send(JSON.stringify({ yo: 'world' }));
            });
        },
    });
    server.gest('/database_count', (i, o) => __awaiter(this, void 0, void 0, function* () {
        const db = yield rds_1.database();
        const r = yield db.query('show databases;');
        return bag_1.bago(r.length);
    }));
    // todo: Other routes here...
}
exports.load_routes = load_routes;
//# sourceMappingURL=route.js.map