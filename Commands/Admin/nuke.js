const { CommandInteraction, Client, ChannelType } = require('discord.js')

module.exports = {
    name: 'nuke',
    description: 'Löscht alle Kanäle auf einem Server',
    dev: true,

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        interaction.reply({content: 'YESSIR', ephemeral: true})
        for (const [_, channel] of interaction.guild.channels.cache) {
           if(channel.deletable){
                await channel.delete()
           }
        }
        const channel = await interaction.guild.channels.create({
            name: 'nuke successful',
            type: ChannelType.GuildText
        })
        await channel.send('Dieser Server wurde genuked C:')
    }
}