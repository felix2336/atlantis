const { Message } = require('discord.js')

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Message} message 
     */

    async execute(message) {
        if (message.channel.id != '1175126826062987344') return
        if (!message.content.toLowerCase().startsWith('wahrheit oder pflicht')) return
        await message.channel.send('<@&1175441946852991086>')
    }
}