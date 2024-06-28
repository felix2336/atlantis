import { Button } from 'dcbot'
import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default new Button({
    id: 'ce_thumbnail',

    async execute(interaction: ButtonInteraction) {
        //@ts-ignore
        if (interaction.user.username != interaction.message.embeds[0].author.name) {
            interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })
            return
        }

        
        const modal = new ModalBuilder({
            customId: 'ce_thumbnail',
            title: 'Beschreibung ändern'
        })

        const title = new TextInputBuilder({
            label: 'Gib hier die URL für das Thumbnail ein',
            minLength: 1,
            customId: 'url',
            required: true,
            style: 2
        })

        const row = new ActionRowBuilder().addComponents(title)
        //@ts-ignore
        modal.addComponents(row)

        await interaction.showModal(modal)
    }
})