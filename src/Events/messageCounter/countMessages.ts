import { Message, Events, ChannelType } from 'discord.js';
import Messages from '../../Schemas/messages'
import { Event } from 'dcbot';

export default new Event({
    name: Events.MessageCreate,

    async execute(client, message: Message) {
        if (message.author.bot) return;
        if (message.channel.type == ChannelType.DM) return;
        if (message.channel.parentId == '1156996872657977394') return;
        if (message.channel.parentId == '1180678820085370940') return;

        const DBUser = await Messages.findOne({ userId: message.author.id })

        if (!DBUser) {
            await Messages.create({
                userId: message.author.id,
                messagesSent: 1,
            })
        } else {
            DBUser.messagesSent++
            await DBUser.save()
        }
    }
})