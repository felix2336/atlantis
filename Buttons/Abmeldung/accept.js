const { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType, ActionRowBuilder } = require('discord.js')
const allowed = [
    '773072144304963624',
    '1196808890227118201',
    '1035799257409667102'
]
module.exports = {
    id: 'accept',

    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction) {
        if (allowed.some(id => interaction.user.id == id)) {
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
        else return interaction.reply({content: 'Du darfst keine Abmeldungen akzeptieren', ephemeral: true})
    }
}