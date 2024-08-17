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
exports.MemberManager = void 0;
const discord_js_1 = require("discord.js");
const Channels_1 = require("../Enums/Channels");
const Roles_1 = require("../Enums/Roles");
const UnbanRequestButton_1 = require("../Buttons/UnbanRequestButton");
class MemberManager {
    constructor(member, guild) {
        this.member = member;
        this.guild = guild;
    }
    getMember() {
        return this.member;
    }
    addRole(roleOrRoles) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.member.roles.add(roleOrRoles).catch(console.log);
        });
    }
    removeRole(roleOrRoles) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.member.roles.remove(roleOrRoles).catch(console.log);
        });
    }
    hasRole(role) {
        return this.member.roles.cache.has(role);
    }
    ban(moderator, reason, deleteMessageSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.member.ban({ reason });
            }
            catch (error) {
                return false;
            }
            const embed = new discord_js_1.EmbedBuilder({
                author: { name: this.guild.name, iconURL: this.guild.iconURL() || '' },
                title: 'Du wurdest gebannt',
                description: `Grund: **${reason}**.\n\nDu kannst mit dem Button unten einen Entbannungsantrag stellen!`,
                color: discord_js_1.Colors.Red
            });
            const logEmbed = new discord_js_1.EmbedBuilder({
                title: 'Neuer Ban',
                fields: [
                    { name: 'User', value: `${this.member} (${this.member.user.username}) - ${this.member.user.id}` },
                    { name: 'Grund', value: reason }
                ],
                footer: { text: `Durchgeführt von ${moderator.user.username}`, iconURL: moderator.user.displayAvatarURL() }
            });
            const channel = this.guild.channels.cache.get(Channels_1.Channels.user_update_log);
            yield this.member.send({ embeds: [embed], components: [new discord_js_1.ActionRowBuilder({ components: [UnbanRequestButton_1.UnbanRequestButton] })] }).catch(console.log);
            yield channel.send({ embeds: [logEmbed] }).catch(console.log);
            return true;
        });
    }
    kick(moderator, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.member.kick(reason).catch(e => {
                console.log(e);
                return false;
            });
            const embed = new discord_js_1.EmbedBuilder({
                author: { name: this.guild.name, iconURL: this.guild.iconURL() || '' },
                title: 'Du wurdest gekickt',
                description: `Grund: **${reason}**.`,
                color: discord_js_1.Colors.Red
            });
            const logEmbed = new discord_js_1.EmbedBuilder({
                title: 'Neuer Kick',
                fields: [
                    { name: 'User', value: `${this.member} (${this.member.user.username}) - ${this.member.user.id}` },
                    { name: 'Grund', value: reason }
                ],
                footer: { text: `Durchgeführt von ${moderator.user.username}`, iconURL: moderator.user.displayAvatarURL() }
            });
            const channel = this.guild.channels.cache.get(Channels_1.Channels.user_update_log);
            yield this.member.send({ embeds: [embed], components: [new discord_js_1.ActionRowBuilder({ components: [UnbanRequestButton_1.UnbanRequestButton] })] }).catch(console.log);
            yield channel.send({ embeds: [logEmbed] }).catch(console.log);
            return true;
        });
    }
    getId() {
        return this.member.user.id;
    }
    getAvatarUrl() {
        return this.member.displayAvatarURL();
    }
    getPermissions() {
        const perms = [];
        for (const perm of this.member.permissions) {
            perms.push(perm);
        }
        perms.sort();
        return perms;
    }
    getRoles() {
        const roles = [];
        for (const [id, role] of this.member.roles.cache) {
            if (role.name == '@everyone')
                continue;
            roles.push(role);
        }
        roles.sort((a, b) => b.position - a.position);
        return roles;
    }
    isStaff() {
        return this.member.roles.cache.some(r => r.id == Roles_1.Roles.staff);
    }
}
exports.MemberManager = MemberManager;
