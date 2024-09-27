import { SlashCommand } from "dcbot";
import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import { exec } from 'child_process'

export default new SlashCommand({
    // Definition der Kommandodaten
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('Öffne einen Glückskeks'),

    // Ausführung des Kommandos
    async execute(interaction, client) {
        // Ausführen des 'fortune'-Befehls und Verarbeitung der Ausgabe
        exec('fortune', async (error, stdout, stderr) => {
            // Fehlerbehandlung
            if (error) {
                // Loggen des Fehlers
                client.logger.error(error.message)
                // Erstellen einer Fehlermeldung
                const embed = new EmbedBuilder({
                    title: 'Unerwarteter Fehler',
                    description: 'Ein Fehler ist aufgetreten. Bitte kontaktiere einen Administrator.',
                    color: Colors.DarkRed
                })
                // Senden der Fehlermeldung
                await interaction.reply({ embeds: [embed] })
            }
            // Verarbeiten der Ausgabe
            if (stdout) {
                // Erstellen einer Erfolgsmeldung
                const embed = new EmbedBuilder({
                    title: 'Glückskeks',
                    description: '***Du öffnest einen Glückskeks und erhältst folgende Nachricht:***\n\n' + stdout,
                    color: Colors.Green
                })
                // Senden der Erfolgsmeldung
                await interaction.reply({ embeds: [embed] })
            }
        })
    },
})
