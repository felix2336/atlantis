import { ModalSubmitInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, TextChannel, Client, Colors, ForumChannel } from 'discord.js'
import { Channels } from 'contents'
import { Modal } from 'dcbot'

export default new Modal({
    id: 'close-with-reason',

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true })
        const logChannel = client.channels.cache.get(Channels.ticket_log) as TextChannel
        const userid = (interaction.channel as TextChannel).name.split('-')[1]
        const member = interaction.guild!.members.cache.get(userid)

        const logEmbed = new EmbedBuilder({
            title: 'Ticket geschlossen',
            fields: [
                { name: 'Ersteller', value: `${member}`, inline: true },
                { name: 'Geschlossen von', value: `${interaction.member}`, inline: true },
                { name: 'Erstellungsdatum', value: `${interaction.channel?.createdAt?.toLocaleDateString()}`, inline: false },
                { name: 'Grund der Schließung', value: interaction.fields.getTextInputValue('reason') }
            ],
            color: Colors.Green,
            timestamp: new Date
        })

        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel
        const wh = (await transkripts.fetchWebhooks()).first()
        const transkript = transkripts.threads.cache.find(ch => ch.name == (interaction.channel as TextChannel).name)

        if (!wh) {
            return
        }

        await wh.send({
            username: 'TICKET MASTER',
            avatarURL: 'https://cdn.discordapp.com/emojis/1229101938977800222.webp?size=96&quality=lossless',
            content: '# Ticket geschlossen!'
        })

        const userEmbed = new EmbedBuilder(logEmbed.data).setAuthor({name: interaction.guild!.name, iconURL: interaction.guild!.iconURL() || ''})
        await logChannel.send({embeds: [logEmbed]})
        await member!.send({embeds: [userEmbed]})
        .catch(async err => {
            await interaction.editReply('Die DM Nachricht konnte nicht zugestellt werden!')
        })
        .then(async () => {
            await interaction.editReply('Der Ersteller des Tickets wurde über die Schließung informiert!')
        })
        .finally(async () => {
            await interaction.channel!.send({content: 'Dieses Ticket wird in 5 Sekunden gelöscht!'})
        })
        
        setTimeout(async () => {
            await interaction.channel!.delete()
        }, 5000);
    }
})