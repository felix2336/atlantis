import { ModalSubmitInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, Colors, ChannelType, APIEmbedField, ForumChannel } from 'discord.js'
import { Categories, Channels, Roles, ticketButtons } from 'contents'
import { Modal } from 'dcbot'

export default new Modal({
    id: 'report',

    async execute(interaction, client) {
        // Abrufen des Transkript-Kanals
        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel

        // Erstellen eines neuen Kanals für das Report-Ticket
        const channel = await interaction.guild!.channels.create({
            name: `report-${interaction.user.id}`,
            type: ChannelType.GuildText,
            parent: Categories.ticket,
            permissionOverwrites: [
                { id: interaction.user, allow: ['SendMessages', 'ViewChannel'] },
                { id: interaction.guild!.roles.everyone, deny: ['ViewChannel'] }
            ]
        })

        // Erstellen des ersten Embeds für das Report-Ticket
        const embed1 = new EmbedBuilder({
            description: 'Dies ist ein Report Ticket!\nBitte habe etwas Geduld, ein Teammitglied wird sich demnächst um deinen Report kümmern',
            color: 0x0000FF
        })

        // Erstellen des zweiten Embeds für das Report-Ticket mit den Report-Daten
        const embed2 = new EmbedBuilder({
            fields: [
                { name: 'Gemeldeter User', value: interaction.fields.getTextInputValue('target') },
                { name: 'Grund für die Meldung', value: interaction.fields.getTextInputValue('reason') },
                { name: 'Beweise?', value: interaction.fields.getTextInputValue('evidence') }
            ],
            color: 0x0000FF
        })

        // Erstellen eines neuen Threads im Transkript-Kanal
        await transkripts.threads.create({
            name: `report-${interaction.user.id}`,
            message: { embeds: [embed1, embed2] }
        })

        // Senden der Report-Daten in den neuen Kanal
        await channel.send({ content: '@everyone', embeds: [embed1, embed2], components: [ticketButtons] })
            .then(async message => {
                // Entfernen des Inhalts der Nachricht
                await message.edit({ content: '' })
                // Senden einer Bestätigungsnachricht an den Benutzer
                interaction.reply({ content: `Dein Ticket wurde erstellt: ${channel}`, ephemeral: true })
            })
    }
})
