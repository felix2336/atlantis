import { Button } from 'dcbot'
import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default new Button({
    id: 'ce_color',

    async execute(interaction: ButtonInteraction) {
        //@ts-ignore
        if (interaction.user.username != interaction.message.embeds[0].author.name) {
            interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })
            return
        }

        const modal = new ModalBuilder({
            customId: 'ce_color',
            title: 'Farbe ändern'
        })

        const title = new TextInputBuilder({
            label: 'Gib hier den Hex Color Code ein',
            maxLength: 7,
            minLength: 7,
            customId: 'code',
            required: true,
            style: 1
        })

        const row = new ActionRowBuilder().addComponents(title)
        //@ts-ignore
        modal.addComponents(row)

        await interaction.showModal(modal)
    }
})