const { ModalSubmitInteraction, EmbedBuilder, Colors, Client, ButtonBuilder, ActionRowBuilder } = require('discord.js')

module.exports = {
    id: 'modal_staffpoll',

    /**
     * @param {ModalSubmitInteraction} interaction 
     * @param {Client} client
     */

    async execute(interaction, client) {
        const channel = client.channels.cache.get('1208549139126812702')
        const messages = await channel.messages.fetch()
        const message = messages.first()

        const topic = interaction.fields.getTextInputValue('topic')
        const option1 = interaction.fields.getTextInputValue('field1')
        const option2 = interaction.fields.getTextInputValue('field2')
        const option3 = interaction.fields?.getTextInputValue('field3')
        const option4 = interaction.fields?.getTextInputValue('field4')

        const embed = new EmbedBuilder({
            title: 'Umfrage im Team',
            description: `**Thema der Umfrage:**\n${topic}\n `,
            fields: [
                { name: option1, value: `0 Stimmen` },
                { name: option2, value: `0 Stimmen` },
                { name: option3, value: `0 Stimmen` },
                { name: option4, value: `0 Stimmen` },
            ],
            timestamp: new Date(),
            color: Colors.DarkPurple
        })


        const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder({
                customId: 'poll-1',
                label: option1,
                style: 1
            }),
            new ButtonBuilder({
                customId: 'poll-2',
                label: option2,
                style: 1
            }),
            new ButtonBuilder({
                customId: 'poll-3',
                label: option3,
                style: 1
            }),
            new ButtonBuilder({
                customId: 'poll-4',
                label: option4,
                style: 1
            }),
        ])

        if (!option3) {
            embed.data.fields.pop()
            embed.data.fields.pop()
            row.components.pop()
            row.components.pop()
        }
        else if (!option4) {
            embed.data.fields.pop()
            row.components.pop()
        }

        await message.edit({ content: '', embeds: [embed], components: [row] })
        interaction.reply({ content: 'Die Umfrage wurde erfolgreich erstellt', ephemeral: true })
    }
}