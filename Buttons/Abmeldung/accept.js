const { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType, ActionRowBuilder } = require('discord.js')

module.exports = {
    id: 'accept',

    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction) {

        const modal = new ModalBuilder({
            title: 'Abmeldung akzeptieren',
            customId: 'accept',
        })

        const reason = new TextInputBuilder({
            label: 'Grund (optional)',
            customId: 'accept_reason',
            required: false,
            style: TextInputStyle.Paragraph,
            maxLength: 1000
        })

        const row1 = new ActionRowBuilder().addComponents(reason)

        modal.addComponents(row1)
        await interaction.showModal(modal)
    }
}