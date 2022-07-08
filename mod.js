"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONUP = void 0;
class JSONUP {
    static parse(string, reviver) {
        return JSON.parse(string, reviver);
    }
    static stringify(object, replacer, space) {
        return JSON.stringify(object, replacer, space);
    }
}
exports.JSONUP = JSONUP;
