"use strict";
// # Global Constance
Object.defineProperty(exports, "__esModule", { value: true });
// ## Regular Expression
// Variable name
exports.RE_identifier = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
// Double curly braces templating syntax: {{x}}
exports.RE_2curly = /{{([\s\S]+?)}}/g;
// ## Names
// This value should be sync with service names in docker-compose.yml
exports.N_app_name = 'app';
exports.N_common = 'common';
// ## File Names
exports.N_file_env = '.env';
exports.N_file_env_example = 'env.example';
exports.N_file_readme = 'readme.md';
exports.N_file_dc = 'docker-compose.yml';
exports.N_file_dc_dev = 'docker-compose.development.yml';
exports.N_file_dc_prod = 'docker-compose.production.yml';
exports.N_file_dockerfile = 'Dockerfile';
exports.N_file_dockerfile_dev = 'Dockerfile.development';
exports.N_file_dockerfile_prod = 'Dockerfile.production';
//# sourceMappingURL=constant.js.map