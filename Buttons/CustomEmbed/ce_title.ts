import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default {
    id: 'ce_title',

    async execute(interaction: ButtonInteraction){
        //@ts-ignore
        if (interaction.user.username != interaction.message.embeds[0].author.name) return interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })

        const modal = new ModalBuilder({
            customId: 'ce_title',
            title: 'Titel ändern'
        })

        const title = new TextInputBuilder({
            label: 'Gib hier den neuen Titel ein',
            maxLength: 256,
            minLength: 1,
            customId: 'title',
            required: true,
            style: 1
        })

        const row = new ActionRowBuilder().addComponents(title)
        //@ts-ignore
        modal.addComponents(row)

        await interaction.showModal(modal)
    }
}