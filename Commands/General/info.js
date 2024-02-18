const { CommandInteraction, EmbedBuilder, Client } = require('discord.js')

module.exports = {
    name: 'info',
    description: 'Lasse dir Infos zum Bot anzeigen',
    permission: 'SendMessages',
    
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */

    async execute(interaction, client){
        const embed = new EmbedBuilder({
            title: `${client.user.username} Infos`,
            description: `${client.user} wurde von <@773072144304963624> und <@731990066158895175> mit der discord.js Library programmiert.
            
            <:discordjs:1208835491101802576> Discord.js \`v14.12.1\`
            <:nodejs:1208835656835407902> NodeJS \`v21.6.1\`
            
            Wenn du einen guten kostengünstigen Hoster suchst, schau doch mal [hier](https://ht-hosting.de/aff.php?aff=275) vorbei`,
            timestamp: new Date(),
            footer: {text: client.user.username + ' Info', iconURL: client.user.displayAvatarURL()},
            thumbnail: {url: client.user.displayAvatarURL()}
        })

        await interaction.reply({embeds: [embed]})
    }
}