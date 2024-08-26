import { Button } from 'dcbot'
import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default new Button({
    id: 'ce_image',

    async execute(interaction: ButtonInteraction) {
        if (interaction.user.username != interaction.message.embeds[0].author!.name) {
            interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })
            return
        }

        const modal = new ModalBuilder({
            customId: 'ce_image',
            title: 'Bild ändern'
        })

        const image = new TextInputBuilder({
            label: 'Gib hier die URL für das Bild ein',
            minLength: 1,
            customId: 'url',
            required: true,
            style: 2
        })

        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(image)
        modal.addComponents(row)

        await interaction.showModal(modal)
    }
})