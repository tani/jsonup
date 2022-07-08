// (c) 2022 TANIGUCHI Masaya. https://git.io/mit-license
"use strict";
exports.__esModule = true;
exports.JSONUP = void 0;
var JSONUP = /** @class */ (function () {
    function JSONUP() {
    }
    JSONUP.parse = function (string, reviver) {
        return JSON.parse(string, reviver);
    };
    JSONUP.stringify = function (object, replacer, space) {
        return JSON.stringify(object, replacer, space);
    };
    return JSONUP;
}());
exports.JSONUP = JSONUP;
