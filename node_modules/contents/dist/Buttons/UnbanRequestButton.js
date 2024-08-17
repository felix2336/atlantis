"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnbanRequestButton = void 0;
const discord_js_1 = require("discord.js");
exports.UnbanRequestButton = new discord_js_1.ButtonBuilder({
    label: 'Entbannungsantrag',
    customId: 'unban-request',
    style: 1,
});
