import { MessageContextMenu } from 'dcbot'
import { ApplicationCommandType, Colors, ContextMenuCommandBuilder, EmbedBuilder } from 'discord.js'
import config from '../../System/config.json'
import axios from 'axios'

export default new MessageContextMenu({
    // Definiere die Daten für den Context-Menü-Befehl
    data: new ContextMenuCommandBuilder()
        .setName('Auf KI prüfen mit Sapling')
        .setType(ApplicationCommandType.Message),

    // Funktion, die ausgeführt wird, wenn der Befehl verwendet wird
    async execute(interaction, client) {
        // Hole den Inhalt der Nachricht, auf die der Befehl angewendet wird
        const text = interaction.targetMessage.content
        // Sage dem Discord-Client, dass die Antwort verzögert wird
        await interaction.deferReply({ ephemeral: true })

        try {
            // Sende eine Anfrage an die Sapling-API, um den Text auf KI-Erkennung zu prüfen
            const response = await axios.post(
                'https://api.sapling.ai/api/v1/aidetect',
                {
                    key: config.sapling_ai_check_key,
                    text
                },
            )
            // Hole den Status und die Daten aus der Antwort
            const { status, data } = response
            // Erstelle eine Embed-Nachricht mit den Ergebnissen
            const embed = new EmbedBuilder({
                title: `Die Prüfung ergab folgendes:`,
                description: `Dieser Text wurde zu einer Wahrscheinlichkeit von ${(data.score * 100).toFixed(2)}% von einer KI geschrieben!`,
                color: Colors.Green
            })
            // Sende die Embed-Nachricht als Antwort
            await interaction.editReply({ embeds: [embed] })
        } catch (err) {
            // Protokolliere den Fehler
            client.logger.error(err)
            // Erstelle eine Fehler-Nachricht
            const embed = new EmbedBuilder({
                title: 'Fehler',
                description: 'Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal oder wende dich an den Entwickler',
                color: Colors.Red,
            })
            // Sende die Fehler-Nachricht als Antwort
            await interaction.editReply({ embeds: [embed] })
        }
    }
})
