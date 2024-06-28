import { Message, Events } from 'discord.js';
import { Event } from 'dcbot';
export default new Event({
    name: Events.MessageCreate,

    async execute(client, message: Message) {
        if (message.channelId != '1200374840696246302') return
        if (message.embeds.length != 0) return;
        setTimeout(async () => {
            const msg = await message.channel.messages.fetch(message.id);
            if (!msg) return;
            else if (msg && !msg.pinned && msg.deletable) {
                await msg.delete().catch(err => {
                    console.log(err)
                })
            } else {
                await msg.react(':name_badge:')
                return
            }
        }, 5000)
    }
})