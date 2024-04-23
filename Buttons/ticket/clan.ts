import { ActionRowBuilder, ButtonInteraction, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js'

export default {
    id: 'clan-ticket',

    async execute(interaction: ButtonInteraction) {
        const modal = new ModalBuilder({
            title: "Einem Clan beitreten",
            customId: 'clan-entry'
        })

        const field = new TextInputBuilder({
            customId: 'clan',
            label: 'In welchen Clan möchtest du?',
            placeholder: 'Bitte schreib hier das Clankürzel',
            required: true,
            style: TextInputStyle.Paragraph
        })

        const row = new ActionRowBuilder<TextInputBuilder>({ components: [field] })

        modal.addComponents(row)

        await interaction.showModal(modal)
    }
}