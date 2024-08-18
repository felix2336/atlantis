"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countdown = countdown;
function countdown(ms) {
    return `<t:${Math.floor(ms / 1000)}:R>`;
}
