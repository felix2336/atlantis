import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import { SlashCommand } from "dcbot";
import Bumps from '../../Schemas/bumps'

// Erstelle einen neuen Slash-Befehl namens 'bumps'
export default new SlashCommand({
    // Definiere die Daten für den Befehl
    data: new SlashCommandBuilder()
        .setName('bumps')
        .setDescription('Sehe, wie oft du schon gebumpt hast'),

    // Funktion, die aufgerufen wird, wenn der Befehl ausgeführt wird
    async execute(interaction, client) {
        // Erstelle einen neuen Embed, um die Antwort zu formatieren
        const embed = new EmbedBuilder({
            color: Colors.Gold,
            description: ''
        })

        // Suche nach dem Benutzer in der Datenbank und hole die Anzahl der Bumps
        await Bumps.findOne({ userId: interaction.user.id })
            .then(User => {
                // Setze die Beschreibung des Embeds auf die Anzahl der Bumps
                embed.data.description = `Du hast bisher ${User?.bumps || 0} mal gebumpt`
            })

        // Sende die Antwort als Embed
        interaction.reply({ embeds: [embed], ephemeral: true })
    },
})
