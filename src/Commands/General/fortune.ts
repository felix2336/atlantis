import { SlashCommand } from "dcbot";
import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import {exec} from 'child_process'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('Öffne einen Glückskeks'),

    async execute(interaction, client) {
        exec('fortune', async (error, stdout, stderr) => {
            if(error) {
                client.logger.error(error.message)
                const embed = new EmbedBuilder({
                    title: 'Unerwarteter Fehler',
                    description: 'Ein Fehler ist aufgetreten. Bitte kontaktiere einen Administrator.',
                    color: Colors.DarkRed
                })
                await interaction.reply({embeds: [embed]})
            }
            if(stdout) {
                const embed = new EmbedBuilder({
                    title: 'Glückskeks',
                    description: '***Du öffnest einen Glückskeks und erhältst folgende Nachricht:***\n\n' + stdout,
                    color: Colors.Green
                })
                await interaction.reply({embeds: [embed]})
            }
        })
    },
})