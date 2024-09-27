import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from 'dcbot'

// Definition eines neuen SlashCommands namens 'info'
export default new SlashCommand({
    // Daten für den SlashCommand
    data: new SlashCommandBuilder()
        .setName('info') // Name des Commands
        .setDescription('Lasse dir Infos zum Bot anzeigen'), // Beschreibung des Commands

    // Funktion, die aufgerufen wird, wenn der Command ausgeführt wird
    async execute(interaction, client) {
        // Erstellung eines neuen Embeds
        const embed = new EmbedBuilder({
            // Titel des Embeds
            title: `${client.user!.username} Infos`,
            // Beschreibung des Embeds
            description: `${client.user} wurde von <@773072144304963624> und <@731990066158895175> mit der discord.js Library programmiert.
            
            <:ActiveDev_Badge:1211374507873406996> Befehle: \`${client.commands.size}\`
            <:discordjs:1208835491101802576> Discord.js \`v14.12.1\`
            <:nodejs:1208835656835407902> NodeJS \`v21.6.1\`
            
            Wenn du einen guten kostengünstigen Hoster suchst, schau doch mal [hier](https://ht-hosting.de/aff.php?aff=275) vorbei`,
            // Zeitstempel des Embeds
            timestamp: new Date(),
            // Fußzeile des Embeds
            footer: { text: client.user!.username + ' Info', iconURL: client.user!.displayAvatarURL() },
            // Vorschaubild des Embeds
            thumbnail: { url: client.user!.displayAvatarURL() }
        })

        // Senden des Embeds als Antwort auf die Interaktion
        await interaction.reply({ embeds: [embed] })
    }
})
