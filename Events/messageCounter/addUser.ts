import { GuildMember, Events, Message } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs'
import { MessageUser, Roles } from '../../contents';

export default {
    name: Events.GuildMemberUpdate,

    async execute(oldMember: GuildMember, newMember: GuildMember) {
        if (oldMember.user.bot) return;
        let DB = JSON.parse(readFileSync('./JSON/messages.json', 'utf8')) as MessageUser[]
        if (!oldMember.roles.cache.has(Roles.staff) && newMember.roles.cache.has(Roles.staff)) {
            const user = new MessageUser({userid: newMember.user.id, username: newMember.user.username});
            DB.push(user)
            writeFileSync('./JSON/messages.json', JSON.stringify(DB, null, 2), 'utf8')
        }
        if (oldMember.roles.cache.has(Roles.staff) && !newMember.roles.cache.has(Roles.staff)) {
            DB = DB.filter(user => user.userid != newMember.user.id)
            writeFileSync('./JSON/messages.json', JSON.stringify(DB, null, 2), 'utf8')
        }
    }
}