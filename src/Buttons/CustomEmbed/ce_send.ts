import { Button } from 'dcbot'
import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default new Button({
    id: 'ce_send',

    async execute(interaction: ButtonInteraction) {
        if (interaction.user.username != interaction.message.embeds[0].author!.name) {
            interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })
            return
        }

        const modal = new ModalBuilder({
            title: 'Embed verschicken',
            customId: 'ce_send'
        })

        const channel = new TextInputBuilder({
            label: 'Gib hier die ID des Channels ein',
            customId: 'channel',
            required: true,
            style: 1
        })

        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(channel)

        modal.addComponents(row)
        await interaction.showModal(modal)
    }
})