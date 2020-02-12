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
const fs = require("fs");
const lodash_1 = require("lodash");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const print_helper_1 = require("@mosteast/print_helper");
/**
 * Load request and response's decorators
 *
 * Checkout `T_request` and `T_response` for documentations
 * @param server
 */
function load_decorators(server) {
    print_helper_1.print_verbose('* load_decorators');
    decorate_server(server);
    decorate_request(server);
    decorate_response(server);
}
exports.load_decorators = load_decorators;
function decorate_server(server) {
    /**
     * Route with both get and post
     */
    server.decorate('gest', (url, handler, opt) => {
        server.route(Object.assign({ url, method: ['GET', 'POST'], handler }, opt));
    });
}
/**
 * Where All request decorators registered
 * @param server
 */
function decorate_request(server) {
    server.decorateRequest('input', function (key, def) {
        let all = Object.assign(Object.assign({}, this.query), this.body);
        return key ? lodash_1.get(all, key, def) : all;
    });
}
/**
 * Where All response decorators registered
 * @param server
 */
function decorate_response(server) {
    server.decorateReply('download', function (path, mime, rename) {
        const stream = fs.createReadStream(path);
        const res = this.type(mime);
        let disposition = `attachment; filename=${(rename !== null && rename !== void 0 ? rename : path_1.basename(path))}`;
        res.header('Content-Disposition', disposition);
        res.send(stream);
    });
    server.decorateReply('file', function (path, mime = 'text/html') {
        return __awaiter(this, void 0, void 0, function* () {
            const res = this;
            try {
                yield fs_extra_1.stat(path);
            }
            catch (e) {
                res.code(404)
                    .send('Not found');
            }
            const stream = fs.createReadStream(path);
            res.type(mime)
                .send(stream);
        });
    });
}
//# sourceMappingURL=load_decorators.js.map