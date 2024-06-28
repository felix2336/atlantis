import { ModalSubmitInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, Colors, ChannelType, APIEmbedField } from 'discord.js'
import { Categories, Roles, ticketButtons } from '../../contents'
import { Modal } from 'dcbot'

export default new Modal({
    id: 'report',

    async execute(interaction) {
        const channel = await interaction.guild!.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: Categories.ticket,
            permissionOverwrites: [
                { id: interaction.user, allow: ['SendMessages', 'ViewChannel'] },
                { id: interaction.guild!.roles.everyone, deny: ['ViewChannel'] }
            ]
        })

        const embed1 = new EmbedBuilder({
            description: 'Dies ist ein Report Ticket!\nBitte habe etwas Geduld, ein Teammitglied wird sich demnächst um deinen Report kümmern',
            color: 0x0000FF
        })
        const embed2 = new EmbedBuilder({
            fields: [
                { name: 'Gemeldeter User', value: interaction.fields.getTextInputValue('target') },
                { name: 'Grund für die Meldung', value: interaction.fields.getTextInputValue('reason') },
                { name: 'Beweise?', value: interaction.fields.getTextInputValue('evidence') }
            ],
            color: 0x0000FF
        })

        await channel.send({ content: '@everyone', embeds: [embed1, embed2], components: [ticketButtons] })
            .then(async message => {
                await message.edit({ content: '' })
                interaction.reply({ content: `Dein Ticket wurde erstellt: ${channel}`, ephemeral: true })
            })
    }
})