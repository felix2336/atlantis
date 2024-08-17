"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketButtons = void 0;
const discord_js_1 = require("discord.js");
exports.ticketButtons = new discord_js_1.ActionRowBuilder().addComponents([
    new discord_js_1.ButtonBuilder({
        customId: 'close-with-reason',
        label: '🔒 Schließen mit Begründung',
        style: 4
    }),
    new discord_js_1.ButtonBuilder({
        customId: 'claim',
        label: '🙋‍♂️ Beanspruchen',
        style: 3
    })
]);
