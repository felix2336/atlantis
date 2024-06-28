import { Button } from 'dcbot'
import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default new Button({
    id: 'ce_title',

    async execute(interaction: ButtonInteraction){
        //@ts-ignore
        if (interaction.user.username != interaction.message.embeds[0].author.name) {
            interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })
            return
        } 

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
})