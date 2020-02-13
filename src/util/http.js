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
const node_fetch_1 = require("node-fetch");
const querystring_1 = require("querystring");
function post(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return node_fetch_1.default(url, {
            method: 'post',
            body: data ? JSON.stringify(data) : undefined,
            headers: {
                'content-type': 'application/json',
            },
        });
    });
}
exports.post = post;
function get(url, query) {
    return __awaiter(this, void 0, void 0, function* () {
        if (query) {
            url += `?${querystring_1.encode(query)}`;
        }
        return node_fetch_1.default(url, {
            method: 'get',
        });
    });
}
exports.get = get;
//# sourceMappingURL=http.js.map