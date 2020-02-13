"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
/**
 * @example
 * ['a', 'b'] --> "a", "b"
 * @param arr
 * @param glue
 * @param lwrap
 * @param rwrap
 */
function str_list(arr, glue = ', ', lwrap = '"', rwrap = '"') {
    return arr.map(it => lwrap + it + rwrap).join(glue);
}
exports.str_list = str_list;
/**
 * @example
 * ['a', 'b', 'c'] --> {a}, {b}, {c}
 * @param args
 */
function str_args(args) {
    return str_list(args, ', ', '{', '}');
}
exports.str_args = str_args;
/**
 * @example
 * ['a', 'b', 'c'] --> {a|b|c}
 * @param args
 * @param relation
 */
function str_args_nest(args, relation = '|') {
    return `{${args.join(relation)}}`;
}
exports.str_args_nest = str_args_nest;
function str_list_(arr, glue = ', ', lwrap = '"', rwrap = '"') {
    return arr.map(it => lwrap + it + rwrap).join(glue);
}
exports.str_list_ = str_list_;
function str_split_at(str, index) {
    return [str.substring(0, index), str.substring(index, str.length)];
}
exports.str_split_at = str_split_at;
/**
 * Compile template using {{variable}} syntax
 *
 * template('a=${a} b=${ b } c=${c }', { a: 1, b: 2, c: 3 })
 *  |
 *  V
 * 'a=1 b=2 c=3'
 *
 * Option:
 *  interpolate: /{{([\s\S]+?)}}/g // for double braces syntax: {{x}}
 * @param content
 * @param args
 * @param opt
 */
function template(content, args, opt) {
    opt = Object.assign({}, opt);
    if (content instanceof Buffer) {
        content = content.toString('utf8');
    }
    const compile = lodash_1.template(content, opt);
    return compile(args);
}
exports.template = template;
//# sourceMappingURL=str.js.map