import { SlashCommand } from 'dcbot'
import { ChannelType, Colors, EmbedBuilder, SlashCommandBuilder, TextChannel } from 'discord.js'
import { Categories, Channels } from '../../contents'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Schließe das aktuelle Ticket')
        .addStringOption(input => input.setName('reason').setDescription('Grund für die Schließung des Tickets').setRequired(true)),

    async execute(interaction, client) {
        const { guild, channel, options } = interaction
        const reason = options.getString('reason', true)
        if (!channel || channel.type != ChannelType.GuildText) {
            interaction.reply({ content: 'Dieser Befehl kann nur in einem Ticket verwendet werden', ephemeral: true })
            return
        }
        if (channel.parentId != Categories.ticket) {
            interaction.reply({ content: 'Dieser Befehl kann nur in einem Ticket verwendet werden', ephemeral: true })
            return
        }
        const creator = channel.name.split('-')[1]
        const logChannel = client.channels.cache.get(Channels.ticket_log) as TextChannel

        const logEmbed = new EmbedBuilder({
            title: 'Ticket geschlossen',
            fields: [
                { name: 'Ersteller', value: creator, inline: true },
                { name: 'Geschlossen von', value: `${interaction.member}`, inline: true },
                { name: 'Erstellungsdatum', value: `${channel.createdAt?.toLocaleDateString()}`, inline: false },
                { name: 'Grund der Schließung', value: reason }
            ],
            color: Colors.Green,
            timestamp: new Date
        })

        await logChannel.send({ embeds: [logEmbed] })
        await interaction.channel!.delete()
    },
})