"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimize = void 0;
var stringify = require("json-stringify-safe");
var lodash_1 = require("lodash");
var AST_1 = require("./types/AST");
var utils_1 = require("./utils");
function optimize(ast, processed) {
    if (processed === void 0) { processed = new Set(); }
    utils_1.log('cyan', 'optimizer', ast, processed.has(ast) ? '(FROM CACHE)' : '');
    if (processed.has(ast)) {
        return ast;
    }
    processed.add(ast);
    switch (ast.type) {
        case 'INTERFACE':
            return Object.assign(ast, {
                params: ast.params.map(function (_) { return Object.assign(_, { ast: optimize(_.ast, processed) }); })
            });
        case 'INTERSECTION':
        case 'UNION':
            // [A, B, C, Any] -> Any
            if (ast.params.some(function (_) { return _.type === 'ANY'; })) {
                utils_1.log('cyan', 'optimizer', '[A, B, C, Any] -> Any', ast);
                return AST_1.T_ANY;
            }
            // [A, B, C, Unknown] -> Unknown
            if (ast.params.some(function (_) { return _.type === 'UNKNOWN'; })) {
                utils_1.log('cyan', 'optimizer', '[A, B, C, Unknown] -> Unknown', ast);
                return AST_1.T_UNKNOWN;
            }
            // [A, B, B] -> [A, B]
            var shouldTakeStandaloneNameIntoAccount_1 = ast.params.filter(function (_) { return _.standaloneName; }).length > 1;
            var params = lodash_1.uniqBy(ast.params, function (_) { return "\n          " + _.type + "-\n          " + (shouldTakeStandaloneNameIntoAccount_1 ? _.standaloneName : '') + "-\n          " + stringify(_.params) + "\n        "; });
            if (params.length !== ast.params.length) {
                utils_1.log('cyan', 'optimizer', '[A, B, B] -> [A, B]', ast);
                ast.params = params;
            }
            return Object.assign(ast, {
                params: ast.params.map(function (_) { return optimize(_, processed); })
            });
        default:
            return ast;
    }
}
exports.optimize = optimize;
//# sourceMappingURL=optimizer.js.map