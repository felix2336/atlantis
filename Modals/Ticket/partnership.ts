import { ModalSubmitInteraction, EmbedBuilder, Client, ChannelType } from "discord.js";
import { Categories, Roles, ticketButtons } from "../../contents";
import { Modal } from "dcbot";

export default new Modal({
    id: 'partnerschaft',

    async execute(interaction) {
        const channel = await interaction.guild!.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: Categories.ticket,
            permissionOverwrites: [
                { id: interaction.user, allow: ['SendMessages', 'ViewChannel'] },
                { id: interaction.guild!.roles.everyone, deny: ['ViewChannel'] },
                { id: Roles.staff, allow: ['SendMessages', 'ViewChannel']}
            ]
        })
        const memberCount = interaction.fields.getTextInputValue('membercount')
        const description = interaction.fields.getTextInputValue('description')

        const embed = new EmbedBuilder({
            description: `Dies ist ein Partnerschaftsticket!\nBitte habe etwas Geduld, ein Teammitglied wird sich demnächst um deine Anfrage kümmern.`,
            color: 0x0000FF
        })

        const embed2 = new EmbedBuilder({
            description: `**Server Beschreibung**\n${description}`,
            fields: [
                {name: 'Anzahl der Mitglieder', value: memberCount}
            ],
            color: 0x0000FF
        })

        await channel.send({content: '@everyone', embeds: [embed, embed2], components: [ticketButtons]}).then((async message => {
            await message.edit({content: ''})
            interaction.reply({content: `Dein Ticket wurde erstellt: ${channel}`, ephemeral: true})
        }))
    }
})