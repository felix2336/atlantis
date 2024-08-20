import axios from "axios";
import { SlashCommand } from "dcbot";
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('randomfact-add')
        .setDescription('Füge einen Fakt zur Liste hinzu')
        .addStringOption(input => input.setName('fact').setDescription('Gib hier den Fakt ein').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const fact = interaction.options.getString('fact', true)
        const response = await axios.post('http://localhost:3000/api/randomfact/add', {
            fact
        })
        if (response.status == 400) {
            interaction.reply({ content: 'BAD REQUEST' })
            return
        }
        else if (response.status == 200) {
            interaction.reply({ content: 'Fakt hinzugefügt' })
            return
        }
        else {
            interaction.reply({ content: 'Ein unerwarteter Fehler ist aufgetreten' })
            return
        }
    }
})