import { MessageContextMenu } from 'dcbot'
import { ApplicationCommandType, Colors, ContextMenuCommandBuilder, EmbedBuilder } from 'discord.js'
import config from '../../System/config.json'
import axios from 'axios'

export default new MessageContextMenu({
    data: new ContextMenuCommandBuilder()
        .setName('Auf KI prüfen mit Sapling')
        .setType(ApplicationCommandType.Message),

    async execute(interaction, client) {
        const text = interaction.targetMessage.content
        await interaction.deferReply({ ephemeral: true })

        try {
            const response = await axios.post(
                'https://api.sapling.ai/api/v1/aidetect',
                {
                    key: config.sapling_ai_check_key,
                    text
                },
            )
            const { status, data } = response
            const embed = new EmbedBuilder({
                title: `Die Prüfung ergab folgendes:`,
                description: `Dieser Text wurde zu einer Wahrscheinlichkeit von ${(data.score * 100).toFixed(2)}% von einer KI geschrieben!`,
                color: Colors.Green
            })
            await interaction.editReply({ embeds: [embed] })
        } catch (err) {
            client.logger.error(err)
            const embed = new EmbedBuilder({
                title: 'Fehler',
                description: 'Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal oder wende dich an den Entwickler',
                color: Colors.Red,
            })
            await interaction.editReply({ embeds: [embed] })
        }
    }
})