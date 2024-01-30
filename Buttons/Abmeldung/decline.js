const { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    id: 'decline',

    /**
     * @param {ButtonInteraction} interaction 
     */

    async execute(interaction){

        const modal = new ModalBuilder({
            customId: 'decline',
            title: 'Abmeldung ablehnen'
        })

        const reason = new TextInputBuilder({
            customId: 'reason',
            label: 'Grund',
            required: false,
            maxLength: 1024,
            style: TextInputStyle.Paragraph
        })

        const row = new ActionRowBuilder().addComponents(reason)
        modal.addComponents(row)

        await interaction.showModal(modal)
    }
}