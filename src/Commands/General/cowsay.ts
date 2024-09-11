import { SlashCommand } from "dcbot";
import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import {exec} from 'child_process'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('cowsay')
        .setDescription('Lasse eine Kuh etwas sagen')
        .addStringOption(input => input.setName('input').setDescription('Gib hier den Satz ein, den die Kuh sagen soll').setRequired(true)),

    async execute(interaction, client) {
        let input = interaction.options.getString('input', true);
        input = input.replace(')', '\)')

        exec(`cowsay ${input}`, async (error, stdout, stderr) => {
            if(error) {
                client.logger.error(error.message)
                const embed = new EmbedBuilder({
                    title: 'Fehler',
                    description: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut oder wende dich an einen Administrator',
                    color: Colors.DarkRed
                })
                await interaction.reply({embeds: [embed]})
            }
            if(stdout) {
                const embed = new EmbedBuilder({
                    title: 'Kuh sagt',
                    description: `\`\`\`\n${stdout}\n\`\`\``,
                    color: Colors.Green
                })
                await interaction.reply({embeds: [embed]})
            }
        })
    },
})