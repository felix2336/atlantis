import { EmbedBuilder, ChannelType, ForumChannel, WebhookClient } from 'discord.js'
import { Categories, Channels, MyClient, Roles, ticketButtons } from 'contents'
import { Modal } from 'dcbot'

export default new Modal<MyClient>({
    id: 'support',

    async execute(interaction, client) {
        const wh = new WebhookClient({
            url: "https://discord.com/api/webhooks/1266440386818215977/Kd3ls0wXFiiLzhTE8uDi_ACfFyx3vV4AOjBbDVbr_d-hrschdHpA6W24rMZh1yC57Ch7",
        })
        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel

        const channel = await interaction.guild!.channels.create({
            name: `support-${interaction.user.id}`,
            type: ChannelType.GuildText,
            parent: Categories.ticket,
            permissionOverwrites: [
                { id: interaction.user, allow: ['SendMessages', 'ViewChannel'] },
                { id: interaction.guild!.roles.everyone, deny: ['ViewChannel'] },
                { id: Roles.staff, allow: ['SendMessages', 'ViewChannel'] }
            ]
        })

        const embed1 = new EmbedBuilder({
            description: 'Dies ist ein Support Ticket!\nBitte habe etwas Geduld, ein Teammitglied wird sich demnächst um dein Anliegen kümmern',
            color: 0x0000FF
        })

        const embed2 = new EmbedBuilder({
            fields: [
                { name: 'Anliegen', value: interaction.fields.getTextInputValue('issue') }
            ],
            color: 0x0000FF
        })

        await transkripts.threads.create({
            name: `support-${interaction.user.id}`,
            message: { embeds: [embed1, embed2] }
        })


        await channel.send({ content: '@everyone', embeds: [embed1, embed2], components: [ticketButtons] })
            .then(async message => {
                await message.edit({ content: '' })
                interaction.reply({ content: `Dein Ticket wurde erstellt: ${channel}`, ephemeral: true })
            })
    }
})