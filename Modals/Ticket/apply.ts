import { ModalSubmitInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, Colors, ChannelType } from 'discord.js'
import { Categories, Roles, ticketButtons } from '../../contents'
import { Modal } from 'dcbot'

export default new Modal({
    id: 'apply',

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
        const job = interaction.fields.getTextInputValue('job')
        const experience = interaction.fields.getTextInputValue('experience')
        const name = interaction.fields.getTextInputValue('name')
        const age = interaction.fields.getTextInputValue('age')
        const onlinetime = interaction.fields.getTextInputValue('onlinetime')

        const embed1 = new EmbedBuilder({
            description: 'Dies ist ein Bewerbungs Ticket!\nBitte habe etwas Geduld, ein Teammitglied wird sich demnächst um deine Bewerbung kümmern',
            color: 0x0000FF
        })
        const embed2 = new EmbedBuilder({
            fields: [
                { name: 'Als was möchtest du dich bewerben?', value: job },
                { name: 'Erfahrungen', value: experience },
                { name: 'Name', value: name },
                { name: 'Alter', value: age },
                { name: 'Onlinezeiten', value: onlinetime }
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