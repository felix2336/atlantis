import { SlashCommand } from 'dcbot'
import { SlashCommandBuilder } from 'discord.js'
import axios from 'axios'
import { APIRoutes } from 'contents'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('randomfact')
        .setDescription('Gibt einen random Fakt aus'),

    async execute(interaction, client) {
        await axios.get(APIRoutes.randomfact)
            .then(res => {
                interaction.reply(res.data.fact)
            })
    }
})