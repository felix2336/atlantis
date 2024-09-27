import { ModalSubmitInteraction, EmbedBuilder, Client, ChannelType, ForumChannel } from "discord.js";
import { Categories, Channels, Roles, ticketButtons } from "contents";
import { Modal } from "dcbot";

export default new Modal({
    id: 'partnerschaft',

    // Funktion, die ausgeführt wird, wenn das Modal abgeschickt wird
    async execute(interaction, client) {
        // Hole den Transkript-Kanal aus der Cache
        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel

        // Erstelle einen neuen Kanal für das Ticket
        const channel = await interaction.guild!.channels.create({
            name: `ticket-${interaction.user.id}`,
            type: ChannelType.GuildText,
            parent: Categories.ticket,
            permissionOverwrites: [
                { id: interaction.user, allow: ['SendMessages', 'ViewChannel'] },
                { id: interaction.guild!.roles.everyone, deny: ['ViewChannel'] },
                { id: Roles.staff, allow: ['SendMessages', 'ViewChannel'] }
            ]
        })

        // Hole die Eingaben des Nutzers aus dem Modal
        const memberCount = interaction.fields.getTextInputValue('membercount')
        const description = interaction.fields.getTextInputValue('description')

        // Erstelle ein Embed für die Ticket-Beschreibung
        const embed = new EmbedBuilder({
            description: `Dies ist ein Partnerschaftsticket!\nBitte habe etwas Geduld, ein Teammitglied wird sich demnächst um deine Anfrage kümmern.`,
            color: 0x0000FF
        })

        // Erstelle ein Embed für die Server-Beschreibung
        const embed2 = new EmbedBuilder({
            description: `**Server Beschreibung**\n${description}`,
            fields: [
                { name: 'Anzahl der Mitglieder', value: memberCount }
            ],
            color: 0x0000FF
        })

        // Erstelle einen neuen Thread im Transkript-Kanal
        await transkripts.threads.create({
            name: `partner-${interaction.user.id}`,
            message: { embeds: [embed, embed2] }
        })

        // Sende eine Nachricht im Ticket-Kanal und bearbeite sie anschließend
        await channel.send({ content: '@everyone', embeds: [embed, embed2], components: [ticketButtons] }).then((async message => {
            await message.edit({ content: '' })
            // Sende eine Bestätigungsnachricht an den Nutzer
            interaction.reply({ content: `Dein Ticket wurde erstellt: ${channel}`, ephemeral: true })
        }))
    }
})
