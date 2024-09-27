import { SlashCommand } from "dcbot";
import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import { exec } from 'child_process'

/**
 * Befehl, der eine Kuh ein angegebenen Text sagen lässt.
 */
export default new SlashCommand({
    /**
     * Definition des Befehls.
     */
    data: new SlashCommandBuilder()
        .setName('cowsay')
        .setDescription('Lasse eine Kuh etwas sagen')
        .addStringOption(input => input.setName('input').setDescription('Gib hier den Satz ein, den die Kuh sagen soll').setRequired(true)),

    async execute(interaction, client) {
        // Hole den eingegebenen Text aus der Interaktion.
        let input = interaction.options.getString('input', true);
        // Ersetze das rechte Klammernzeichen durch ein escapedes Klammernzeichen, um es im Befehl zu verwenden.
        input = input.replace(')', '\)')

        // Führe den cowsay-Befehl aus und hole die Ausgabe.
        exec(`cowsay ${input}`, async (error, stdout, stderr) => {
            // Wenn ein Fehler auftritt, logge ihn und sende eine Fehlermeldung an den Benutzer.
            if (error) {
                client.logger.error(error.message)
                const embed = new EmbedBuilder({
                    title: 'Fehler',
                    description: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut oder wende dich an einen Administrator',
                    color: Colors.DarkRed
                })
                await interaction.reply({ embeds: [embed] })
            }
            // Wenn die Ausgabe erfolgreich ist, sende sie an den Benutzer.
            if (stdout) {
                const embed = new EmbedBuilder({
                    title: 'Kuh sagt',
                    description: `\`\`\`\n${stdout}\n\`\`\``,
                    color: Colors.Green
                })
                await interaction.reply({ embeds: [embed] })
            }
        })
    },
})
