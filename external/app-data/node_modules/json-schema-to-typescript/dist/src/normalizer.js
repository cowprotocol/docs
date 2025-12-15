"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = void 0;
var JSONSchema_1 = require("./types/JSONSchema");
var utils_1 = require("./utils");
var rules = new Map();
function hasType(schema, type) {
    return schema.type === type || (Array.isArray(schema.type) && schema.type.includes(type));
}
function isObjectType(schema) {
    return schema.properties !== undefined || hasType(schema, 'object') || hasType(schema, 'any');
}
function isArrayType(schema) {
    return schema.items !== undefined || hasType(schema, 'array') || hasType(schema, 'any');
}
rules.set('Remove `type=["null"]` if `enum=[null]`', function (schema) {
    if (Array.isArray(schema.enum) &&
        schema.enum.some(function (e) { return e === null; }) &&
        Array.isArray(schema.type) &&
        schema.type.includes('null')) {
        schema.type = schema.type.filter(function (type) { return type !== 'null'; });
    }
});
rules.set('Destructure unary types', function (schema) {
    if (schema.type && Array.isArray(schema.type) && schema.type.length === 1) {
        schema.type = schema.type[0];
    }
});
rules.set('Add empty `required` property if none is defined', function (schema) {
    if (isObjectType(schema) && !('required' in schema)) {
        schema.required = [];
    }
});
rules.set('Transform `required`=false to `required`=[]', function (schema) {
    if (schema.required === false) {
        schema.required = [];
    }
});
// TODO: default to empty schema (as per spec) instead
rules.set('Default additionalProperties to true', function (schema) {
    if (isObjectType(schema) && !('additionalProperties' in schema) && schema.patternProperties === undefined) {
        schema.additionalProperties = true;
    }
});
rules.set('Default top level `id`', function (schema, fileName) {
    var isRoot = schema[JSONSchema_1.Parent] === null;
    if (isRoot && !schema.id) {
        schema.id = utils_1.toSafeString(utils_1.justName(fileName));
    }
});
rules.set('Escape closing JSDoc Comment', function (schema) {
    utils_1.escapeBlockComment(schema);
});
rules.set('Optionally remove maxItems and minItems', function (schema, _fileName, options) {
    if (options.ignoreMinAndMaxItems) {
        if ('maxItems' in schema) {
            delete schema.maxItems;
        }
        if ('minItems' in schema) {
            delete schema.minItems;
        }
    }
});
rules.set('Normalize schema.minItems', function (schema, _fileName, options) {
    if (options.ignoreMinAndMaxItems) {
        return;
    }
    // make sure we only add the props onto array types
    if (isArrayType(schema)) {
        var minItems = schema.minItems;
        schema.minItems = typeof minItems === 'number' ? minItems : 0;
    }
    // cannot normalize maxItems because maxItems = 0 has an actual meaning
});
rules.set('Normalize schema.items', function (schema, _fileName, options) {
    if (options.ignoreMinAndMaxItems) {
        return;
    }
    var maxItems = schema.maxItems, minItems = schema.minItems;
    var hasMaxItems = typeof maxItems === 'number' && maxItems >= 0;
    var hasMinItems = typeof minItems === 'number' && minItems > 0;
    if (schema.items && !Array.isArray(schema.items) && (hasMaxItems || hasMinItems)) {
        var items = schema.items;
        // create a tuple of length N
        var newItems = Array(maxItems || minItems || 0).fill(items);
        if (!hasMaxItems) {
            // if there is no maximum, then add a spread item to collect the rest
            schema.additionalItems = items;
        }
        schema.items = newItems;
    }
    if (Array.isArray(schema.items) && hasMaxItems && maxItems < schema.items.length) {
        // it's perfectly valid to provide 5 item defs but require maxItems 1
        // obviously we shouldn't emit a type for items that aren't expected
        schema.items = schema.items.slice(0, maxItems);
    }
    return schema;
});
rules.set('Remove extends, if it is empty', function (schema) {
    if (!schema.hasOwnProperty('extends')) {
        return;
    }
    if (schema.extends == null || (Array.isArray(schema.extends) && schema.extends.length === 0)) {
        delete schema.extends;
    }
});
rules.set('Make extends always an array, if it is defined', function (schema) {
    if (schema.extends == null) {
        return;
    }
    if (!Array.isArray(schema.extends)) {
        schema.extends = [schema.extends];
    }
});
rules.set('Transform $defs to definitions', function (schema) {
    if (schema.$defs) {
        schema.definitions = schema.$defs;
        delete schema.$defs;
    }
});
rules.set('Transform const to singleton enum', function (schema) {
    if (schema.const !== undefined) {
        schema.enum = [schema.const];
        delete schema.const;
    }
});
function normalize(rootSchema, filename, options) {
    rules.forEach(function (rule) { return utils_1.traverse(rootSchema, function (schema) { return rule(schema, filename, options); }); });
    return rootSchema;
}
exports.normalize = normalize;
//# sourceMappingURL=normalizer.js.map