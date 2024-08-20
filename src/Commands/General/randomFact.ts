import { SlashCommand } from 'dcbot'
import { SlashCommandBuilder } from 'discord.js'
import axios from 'axios'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('randomfact')
        .setDescription('Gibt einen random Fakt aus'),

    async execute(interaction, client) {
        await axios.get('http://localhost:3000/api/randomfact/get')
            .then(res => {
                interaction.reply(res.data.fact)
            })
    }
})