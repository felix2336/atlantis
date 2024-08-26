import { Button } from 'dcbot'
import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default new Button({
    id: 'ce_description',

    async execute(interaction: ButtonInteraction) {
        if (interaction.user.username != interaction.message.embeds[0].author!.name) {
            interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })
            return
        }

        const modal = new ModalBuilder({
            customId: 'ce_description',
            title: 'Beschreibung ändern'
        })

        const description = new TextInputBuilder({
            label: 'Gib hier die neue Beschreibung ein',
            minLength: 1,
            customId: 'description',
            value: interaction.message.embeds[0].description!,
            required: true,
            style: 2
        })

        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(description)
        modal.addComponents(row)

        await interaction.showModal(modal)
    }
})