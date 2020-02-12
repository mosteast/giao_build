"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
function sha256(str) {
    return crypto_js_1.SHA256(str).toString();
}
exports.sha256 = sha256;
function password_hash(password, salt) {
    return sha256(sha256(password + salt) + salt);
}
exports.password_hash = password_hash;
function password_verify(password, salt, hash) {
    return password_hash(password, salt) === hash;
}
exports.password_verify = password_verify;
//# sourceMappingURL=crypto.js.map