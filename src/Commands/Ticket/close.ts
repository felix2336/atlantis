import { SlashCommand } from 'dcbot'
import { ChannelType, Colors, EmbedBuilder, SlashCommandBuilder, TextChannel, ForumChannel } from 'discord.js'
import { Categories, Channels } from 'contents'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Schließe das aktuelle Ticket')
        .addStringOption(input => input.setName('reason').setDescription('Grund für die Schließung des Tickets').setRequired(true)),

    async execute(interaction, client) {
        // Auslesen der benötigten Informationen aus der Interaktion
        const { guild, channel, options } = interaction
        const reason = options.getString('reason', true)

        // Überprüfung, ob der Befehl in einem gültigen Kanal ausgeführt wird
        if (!channel || channel.type != ChannelType.GuildText) {
            interaction.reply({ content: 'Dieser Befehl kann nur in einem Ticket verwendet werden', ephemeral: true })
            return
        }
        if (channel.parentId != Categories.ticket) {
            interaction.reply({ content: 'Dieser Befehl kann nur in einem Ticket verwendet werden', ephemeral: true })
            return
        }

        // Auslesen des Benutzernamens und des zugehörigen Mitglieds
        const username = (interaction.channel as TextChannel).name.split('-')[1]
        const member = await interaction.guild!.members.fetch((interaction.channel as TextChannel).name.split('-')[1])

        // Auslesen des Transkript-Kanals und des zugehörigen Webhooks
        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel
        const wh = (await transkripts.fetchWebhooks()).first()
        const transkript = transkripts.threads.cache.find(ch => ch.name == (interaction.channel as TextChannel).name)!

        // Überprüfung, ob ein Webhook vorhanden ist
        if (!wh) {
            return
        }

        // Senden einer Nachricht im Transkript-Kanal, dass das Ticket geschlossen wurde
        await wh.send({
            username: 'TICKET MASTER',
            avatarURL: 'https://cdn.discordapp.com/emojis/1229101938977800222.webp?size=96&quality=lossless',
            content: '# Ticket geschlossen!',
            threadId: transkript?.id
        })

        // Auslesen des Log-Kanals und Erstellung des Log-Embeds
        const logChannel = client.channels.cache.get(Channels.ticket_log) as TextChannel
        const creatorId = channel.name.split('-')[1]
        const logEmbed = new EmbedBuilder({
            title: 'Ticket geschlossen',
            fields: [
                { name: 'Ersteller', value: `<@${creatorId}>`, inline: true },
                { name: 'Geschlossen von', value: `${interaction.member}`, inline: true },
                { name: 'Erstellungsdatum', value: `${channel.createdAt?.toLocaleDateString()}`, inline: false },
                { name: 'Grund der Schließung', value: reason }
            ],
            color: Colors.Green,
            timestamp: new Date
        })

        // Umbenennen des Transkript-Kanals und Senden des Log-Embeds
        await transkript.setName(`${transkript.name}-closed`).catch(client.logger.error)
        const userEmbed = new EmbedBuilder(logEmbed.data).setAuthor({ name: interaction.guild!.name, iconURL: interaction.guild!.iconURL() || '' })
        await logChannel.send({ embeds: [logEmbed] })
        await member!.send({ embeds: [userEmbed] }).catch(console.log)
        await interaction.channel!.delete()

        // Entfernen des Tickets
        await interaction.channel!.delete()
    },
})
