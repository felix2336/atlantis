import { ModalSubmitInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, Colors, ChannelType } from 'discord.js'
import { Categories, Roles } from '../../contents'

export default {
    id: 'apply',

    async execute(interaction: ModalSubmitInteraction) {
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
            description: 'Dies ist ein Bewerbungs Ticket!\nBitte habe etwas Geduld, ein Teammitglied wird sich demnächst um deine Bewerbung kümmern',
            color: 0x0000FF
        })
        const embed2 = new EmbedBuilder({
            fields: [],
            color: 0x0000FF
        })

        for(const [_, field] of interaction.fields.fields) {
            embed2.data.fields!.push({name: field.data.label, value: field.value})
        }

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder({
                customId: 'close',
                label: '🔒 Schließen',
                style: 4,
            }),
            new ButtonBuilder({
                customId: 'close-with-reason',
                label: '🔒 Schließen mit Begründung',
                style: 4
            }),
            new ButtonBuilder({
                customId: 'claim',
                label: '🙋‍♂️ Beanspruchen',
                style: 3
            })
        ])

        await channel.send({ content: '@everyone', embeds: [embed1, embed2], components: [row] })
        .then(async message => {
            await message.edit({ content: '' })
            interaction.reply({content: `Dein Ticket wurde erstellt: ${channel}`, ephemeral: true})
        })
    }
}