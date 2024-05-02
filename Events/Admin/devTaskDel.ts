import { Message, Events } from 'discord.js';

export default {
    name: Events.MessageCreate,

    async execute(message: Message) {
        if (message.channelId != '1200374840696246302') return
        if (message.embeds.length != 0) return
        setTimeout(async () => {
            const msg = await message.channel.messages.fetch(message.id);
            if (!msg) return;
            else if (msg && !msg.pinned && msg.deletable) {
                await msg.delete()
            } else return await msg.react(':name_badge:')
        }, 5000)
    }
}