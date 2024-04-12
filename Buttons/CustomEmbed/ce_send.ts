import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default {
    id: 'ce_send',

    async execute(interaction: ButtonInteraction) {
        if (interaction.user.username != interaction.message.embeds[0].author!.name) return interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })

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

        const row = new ActionRowBuilder().addComponents(channel)

        //@ts-ignore
        modal.addComponents(row)
        await interaction.showModal(modal)
    }
}