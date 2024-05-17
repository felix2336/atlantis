import { ChatInputCommandInteraction, Client, EmbedBuilder, ApplicationCommandOptionType, SlashCommandBuilder } from 'discord.js';
import fs from 'fs';
import { SlashCommand } from '../../contents';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Führe diesen Befehl aus, wenn du Hilfe brauchst')
        .addSubcommand(input => input
            .setName('casino')
            .setDescription('Lasse dir alle Befehle zum Casino System anzeigen')
        ),

    async execute(interaction: ChatInputCommandInteraction, client: Client) {
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand()

        switch (subcommand) {
            case 'casino': {
                const fieldArray: any[] = [];
                const dir = fs.readdirSync('./Commands/Casino')
                dir.forEach(file => {
                    const module = require(`../../Commands/Casino/${file}`)
                    if (!module.cmdid) return;
                    const name = module.name
                    const value = module.description
                    fieldArray.push({ name: `</${name}:${module.cmdid}>`, value })
                })


                const embed = new EmbedBuilder({
                    title: '**Casino Hilfe**',
                    description: 'Hier findest du alle Befehle des Casino Systems',
                    fields: fieldArray,
                    color: 0xffc400
                })
                interaction.reply({ embeds: [embed] })
            }
        }
    }
}
export default command