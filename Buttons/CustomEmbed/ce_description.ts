import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default {
    id: 'ce_description',

    async execute(interaction: ButtonInteraction) {
        //@ts-ignore
        if (interaction.user.username != interaction.message.embeds[0].author.name) return interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })

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

        const row = new ActionRowBuilder().addComponents(description)
        //@ts-ignore
        modal.addComponents(row)

        await interaction.showModal(modal)
    }
}