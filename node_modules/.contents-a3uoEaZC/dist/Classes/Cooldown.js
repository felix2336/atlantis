"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cooldown = void 0;
class Cooldown {
    constructor() {
        this.storage = {};
    }
    delete(key) {
        const keyString = String(key);
        if (this.storage[keyString]) {
            delete this.storage[keyString];
            return true;
        }
        return false;
    }
    has(key) {
        const keyString = String(key);
        return this.storage[keyString] !== undefined;
    }
    isExpired(key) {
        const keyString = String(key);
        const n = Date.now();
        if (this.storage[keyString] < n || !this.storage[keyString]) {
            return true;
        }
        return false;
    }
    set(key, value) {
        const keyString = String(key);
        this.storage[keyString] = value;
    }
}
exports.Cooldown = Cooldown;
