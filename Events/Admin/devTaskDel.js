const { Message, Events } = require('discord.js')

module.exports = {
    name: Events.MessageCreate,

    /**
     * @param {Message} message 
     */

    async execute(message) {
        if (message.channelId != '1200374840696246302') return
        if (message.author.bot) return;
        setTimeout(async () => {
            const msg = await message.channel.messages.fetch(message.id);
            if (!msg) return;
            else if (msg && !msg.pinned && msg.deletable) {
                await msg.delete()
            } else return await msg.react(':name_badge:')
        }, 5000)
    }
}