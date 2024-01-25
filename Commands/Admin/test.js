const { CommandInteraction } = require('discord.js')

module.exports = {
    name: 'test',
    description: 'test command',
    dev: true,
    cmdid: '',

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction){
        // interaction.reply(`</test:${interaction.commandId}>`)
        interaction.reply('done')
        update(interaction.commandId)
    }
}
function update(param){
    module.exports.cmdid = param
}