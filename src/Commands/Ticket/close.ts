import { SlashCommand } from 'dcbot'
import { ChannelType, Colors, EmbedBuilder, ForumChannel, SlashCommandBuilder, TextChannel } from 'discord.js'
import { Categories, Channels } from 'contents'

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
        const userId = channel.name.split('-')[1]
        const logChannel = client.channels.cache.get(Channels.ticket_log) as TextChannel
        const member = guild!.members.cache.get(userId)

        const logEmbed = new EmbedBuilder({
            title: 'Ticket geschlossen',
            fields: [
                { name: 'Ersteller', value: `<@${userId}>`, inline: true },
                { name: 'Geschlossen von', value: `${interaction.member}`, inline: true },
                { name: 'Erstellungsdatum', value: `${channel.createdAt?.toLocaleDateString()}`, inline: false },
                { name: 'Grund der Schließung', value: reason }
            ],
            color: Colors.Green,
            timestamp: new Date
        })

        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel
        const wh = (await transkripts.fetchWebhooks()).first()
        const transkript = transkripts.threads.cache.find(ch => ch.name == (interaction.channel as TextChannel).name)!

        if (!wh) {
            return
        }

        await wh.send({
            username: 'TICKET MASTER',
            avatarURL: 'https://cdn.discordapp.com/emojis/1229101938977800222.webp?size=96&quality=lossless',
            threadId: transkript.id,
            embeds: [logEmbed]
        })
        await transkript.setName(`${transkript.name}-closed`).catch(client.logger.error)

        if (member) {
            const userEmbed = new EmbedBuilder(logEmbed.data).setAuthor({ name: interaction.guild!.name, iconURL: interaction.guild!.iconURL() || '' })

            await member.send({ embeds: [userEmbed] })
                .catch(async err => {
                    await interaction.editReply('Die DM Nachricht konnte nicht zugestellt werden!')
                })
                .then(async () => {
                    await interaction.editReply('Der Ersteller des Tickets wurde über die Schließung informiert!')
                })
                .finally(async () => {
                    await interaction.channel!.send({ content: 'Dieses Ticket wird in 5 Sekunden gelöscht!' })
                })
        }


        await logChannel.send({ embeds: [logEmbed] })
        await interaction.channel!.delete()
    },
})