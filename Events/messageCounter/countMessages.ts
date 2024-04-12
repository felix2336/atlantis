import { Message, Client, Events, DMChannel, ChannelType } from 'discord.js';
import MessageUser from '../../Classes/staff-messages';
import { Roles } from '../../config';
import {readFileSync, writeFileSync} from 'fs'

export default {
    name: Events.MessageCreate,

    async execute(message: Message, client: Client) {
        if (message.author.bot) return;
        if (message.channel.type == ChannelType.DM) return;
        if (!message.member!.roles.cache.has((Roles.staff))) return;
        if (message.channel.parentId == '1156996872657977394') return;
        if (message.channel.parentId == '1180678820085370940') return;

        let DB = JSON.parse(readFileSync('./JSON/messages.json', 'utf8')) as MessageUser[]

        const UserData = DB.find(u => u.userid == message.author.id)
        let User: MessageUser;
        if (!UserData) {
            User = new MessageUser(message.author.id, message.author.username)
        } else {
            User = new MessageUser().assignData(UserData)
        }
        const day = new Date().getDay()
        User.addMessage(day)
        DB = DB.filter(u => u.userid != message.author.id)
        DB.push(User)
        writeFileSync('./JSON/messages.json', JSON.stringify(DB, null, 2))
    }
}