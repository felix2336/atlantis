import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default {
    id: 'ce_image',

    async execute(interaction: ButtonInteraction) {
        //@ts-ignore
        if (interaction.user.username != interaction.message.embeds[0].author.name) return interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })

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

        const row = new ActionRowBuilder().addComponents(image)
        //@ts-ignore
        modal.addComponents(row)

        await interaction.showModal(modal)
    }
}