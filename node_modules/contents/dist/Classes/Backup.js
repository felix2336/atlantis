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
exports.Backup = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
class Backup {
    constructor(data) {
        this.categories = data === null || data === void 0 ? void 0 : data.categories;
    }
    save(guild) {
        const categories = {};
        guild.channels.cache.filter(channel => channel.type === discord_js_1.ChannelType.GuildCategory).forEach(category => {
            categories[category.name] = {};
            guild.channels.cache.filter(channel => channel.parentId === category.id).forEach(channel => {
                categories[category.name][channel.name] = channel.type;
            });
        });
        this.categories = categories;
        (0, fs_1.writeFileSync)('./JSON/backup.json', JSON.stringify(this, null, 2), 'utf8');
    }
    load(guild) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const category in this.categories) {
                const cat = yield guild.channels.create({
                    name: category,
                    type: discord_js_1.ChannelType.GuildCategory,
                    permissionOverwrites: [
                        {
                            id: guild.roles.everyone,
                            deny: ['ViewChannel']
                        }
                    ]
                });
                const channelData = this.categories[category];
                for (const channel in channelData) {
                    const channelType = channelData[channel];
                    yield guild.channels.create({
                        name: channel,
                        type: channelType,
                        parent: cat
                    });
                }
            }
        });
    }
}
exports.Backup = Backup;
