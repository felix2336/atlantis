const { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    id: 'task_update',

    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction){
        const embed = interaction.message.embeds[0]
        const userId = embed.fields[0].value.split('@')[1].split('>')[0]

        if(interaction.user.id != userId) return interaction.reply({content: 'Nur der User, der die Task geclaimt hat, kann ein Update posten', ephemeral: true})

        const modal = new ModalBuilder({
            title: 'Update zur Task posten',
            customId: 'update_task',
        })

        const updateField = new TextInputBuilder({
            label: 'Was hast du geändert?',
            maxLength: 1024,
            style: TextInputStyle.Paragraph,
            customId: 'update',
            required: true
        })
        const row = new ActionRowBuilder().addComponents(updateField)

        modal.addComponents(row)

        await interaction.showModal(modal)
    }
}