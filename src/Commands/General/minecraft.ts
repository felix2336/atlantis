import { SlashCommand } from 'dcbot'
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'

// Definiert einen neuen Slash-Befehl für Discord
export default new SlashCommand({
    // Daten für den Befehl
    data: new SlashCommandBuilder()
        // Setzt den Namen des Befehls
        .setName('minecraft')
        // Setzt die Beschreibung des Befehls
        .setDescription('Zeigt die IP des Minecraft Servers an'),

    // Funktion, die aufgerufen wird, wenn der Befehl ausgeführt wird
    async execute(interaction, client) {
        // Erstellt einen neuen Embed, der die Informationen enthält
        const embed = new EmbedBuilder({
            // Setzt den Titel des Embeds
            title: 'Atlantis Lounge Minecraft',
            // Setzt die Beschreibung des Embeds
            description: `**Der Minecraft Server befindet sich auf der Version 1.21.1**\n\n**IP:**\n\`\`\`77.90.7.148:25568\`\`\``
        })

        // Sendet die Antwort auf die Interaktion
        await interaction.reply({ embeds: [embed], ephemeral: true })
    },
})
