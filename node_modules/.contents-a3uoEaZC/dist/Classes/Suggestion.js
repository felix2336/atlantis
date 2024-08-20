"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suggestion = void 0;
const discord_js_1 = require("discord.js");
class Suggestion {
    constructor(data) {
        this.user = data.user;
        this.suggestion = data.suggestion;
        this.type = data.type;
    }
    submit(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.EmbedBuilder({
                title: 'Neuer Vorschlag',
                description: `<@${this.user}> hat einen neuen ${this.getTypeString()} eingereicht:\n\n**${this.suggestion}**`,
                color: discord_js_1.Colors.DarkAqua
            });
            yield channel.send({ embeds: [embed] });
        });
    }
    getTypeString() {
        if (this.type == 1)
            return 'Server Vorschlag';
        else if (this.type == 2)
            return 'Bot Vorschlag';
    }
}
exports.Suggestion = Suggestion;
