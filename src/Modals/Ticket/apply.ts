import { EmbedBuilder, ChannelType, ForumChannel } from 'discord.js'
import { Categories, Channels, ticketButtons } from 'contents'
import { Modal } from 'dcbot'

export default new Modal({
    id: 'apply',

    // Funktion, die aufgerufen wird, wenn das Modal ausgeführt wird
    async execute(interaction, client) {
        // Abrufen des Transkript-Kanals
        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel

        // Erstellen eines neuen Kanals für das Bewerbungsticket
        const channel = await interaction.guild!.channels.create({
            name: `bewerbung-${interaction.user.id}`,
            type: ChannelType.GuildText,
            parent: Categories.ticket,
            permissionOverwrites: [
                { id: interaction.user, allow: ['SendMessages', 'ViewChannel'] },
                { id: interaction.guild!.roles.everyone, deny: ['ViewChannel'] }
            ]
        })

        // Abrufen der Eingaben aus dem Modal
        const job = interaction.fields.getTextInputValue('job')
        const experience = interaction.fields.getTextInputValue('experience')
        const name = interaction.fields.getTextInputValue('name')
        const age = interaction.fields.getTextInputValue('age')
        const onlinetime = interaction.fields.getTextInputValue('onlinetime')

        // Erstellen des ersten Embeds
        const embed1 = new EmbedBuilder({
            description: 'Dies ist ein Bewerbungs Ticket!\nBitte habe etwas Geduld, ein Teammitglied wird sich demnächst um deine Bewerbung kümmern',
            color: 0x0000FF
        })

        // Erstellen des zweiten Embeds mit den Bewerbungsinformationen
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

        // Erstellen eines neuen Threads im Transkript-Kanal
        await transkripts.threads.create({
            name: `bewerbung-${interaction.user.id}`,
            message: { embeds: [embed1, embed2] }
        })

        // Senden der Bewerbungsinformationen im neuen Kanal
        await channel.send({ content: '@everyone', embeds: [embed1, embed2], components: [ticketButtons] })
            .then(async message => {
                // Entfernen des "@everyone"-Mentions
                await message.edit({ content: '' })
                // Senden einer Bestätigungsnachricht an den Benutzer
                interaction.reply({ content: `Dein Ticket wurde erstellt: ${channel}`, ephemeral: true })
            })
    }
})
