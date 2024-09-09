import { ButtonInteraction, Client, Colors, EmbedBuilder, ForumChannel, TextChannel } from "discord.js";
import { Channels } from "contents";
import { Button } from "dcbot";

export default new Button({
    id: 'cr_accept',

    async execute(interaction, client) {

        if (interaction.user.id != (interaction.channel as TextChannel).name.split('-')[1]) {
            interaction.reply({ content: 'Nur der Ersteller des Tickets darf diesen Button drücken!', ephemeral: true });
            return
        }

        const logChannel = client.channels.cache.get(Channels.ticket_log) as TextChannel
        const username = (interaction.channel as TextChannel).name.split('-')[1]
        const member = await interaction.guild!.members.fetch((interaction.channel as TextChannel).name.split('-')[1])

        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel
        const wh = (await transkripts.fetchWebhooks()).first()
        const transkript = transkripts.threads.cache.find(ch => ch.name == (interaction.channel as TextChannel).name)!

        if (!wh) {
            return
        }

        await wh.send({
            username: 'TICKET MASTER',
            avatarURL: 'https://cdn.discordapp.com/emojis/1229101938977800222.webp?size=96&quality=lossless',
            content: '# Ticket geschlossen!',
            threadId: transkript?.id
        })

        await transkript.setName(`${transkript.name}-closed`).catch(client.logger.error)

        const logEmbed = new EmbedBuilder({
            title: 'Ticket geschlossen',
            fields: [
                { name: 'Ersteller', value: `${member}`, inline: true },
                { name: 'Geschlossen von', value: `${interaction.member}`, inline: true },
                { name: 'Erstellungsdatum', value: `${interaction.channel?.createdAt?.toLocaleDateString()}`, inline: false },
                { name: 'Grund der Schließung', value: interaction.message.embeds[0].description!.split('\`\`\`')[1] }
            ],
            color: Colors.Green,
            timestamp: new Date
        })

        const userEmbed = new EmbedBuilder(logEmbed.data).setAuthor({ name: interaction.guild!.name, iconURL: interaction.guild!.iconURL() || '' })
        await logChannel.send({ embeds: [logEmbed] })
        await member!.send({ embeds: [userEmbed] }).catch(console.log)
        await interaction.channel!.delete()
    }
})