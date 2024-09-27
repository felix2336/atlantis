import { ModalSubmitInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, TextChannel, Client, Colors, ForumChannel } from 'discord.js'
import { Channels } from 'contents'
import { Modal } from 'dcbot'

export default new Modal({
    id: 'close-with-reason',

    // Funktion, die ausgeführt wird, wenn das Modal abgeschickt wird
    async execute(interaction, client) {
        // Antwort auf die Interaktion verzögern, um die Verarbeitung zu ermöglichen
        await interaction.deferReply({ ephemeral: true })

        // Log-Kanal aus der Cache abrufen
        const logChannel = client.channels.cache.get(Channels.ticket_log) as TextChannel

        // Benutzer-ID aus dem Kanalnamen extrahieren
        const userid = (interaction.channel as TextChannel).name.split('-')[1]

        // Mitglied aus der Cache abrufen
        const member = interaction.guild!.members.cache.get(userid)

        // Embed für den Log-Kanal erstellen
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

        // Transkript-Kanal aus der Cache abrufen
        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel

        // Webhook für den Transkript-Kanal abrufen
        const wh = (await transkripts.fetchWebhooks()).first()

        // Transkript-Thread aus der Cache abrufen
        const transkript = transkripts.threads.cache.find(ch => ch.name == (interaction.channel as TextChannel).name)!

        // Wenn kein Webhook gefunden wurde, Funktion beenden
        if (!wh) {
            return
        }

        // Nachricht im Transkript-Thread senden
        await wh.send({
            username: 'TICKET MASTER',
            avatarURL: 'https://cdn.discordapp.com/emojis/1229101938977800222.webp?size=96&quality=lossless',
            threadId: transkript.id,
            content: '# Ticket geschlossen!'
        })

        // Transkript-Thread umbenennen
        await transkript.setName(`${transkript.name}-closed`).catch(client.logger.error)

        // Embed für den Benutzer erstellen
        const userEmbed = new EmbedBuilder(logEmbed.data).setAuthor({ name: interaction.guild!.name, iconURL: interaction.guild!.iconURL() || '' })

        // Log-Nachricht senden
        await logChannel.send({ embeds: [logEmbed] })

        // Benutzer über die Schließung informieren
        await member!.send({ embeds: [userEmbed] })
            .catch(async err => {
                // Fehlermeldung senden, wenn die DM-Nachricht nicht zugestellt werden konnte
                await interaction.editReply('Die DM Nachricht konnte nicht zugestellt werden!')
            })
            .then(async () => {
                // Erfolgsmeldung senden, wenn die DM-Nachricht zugestellt wurde
                await interaction.editReply('Der Ersteller des Tickets wurde über die Schließung informiert!')
            })
            .finally(async () => {
                // Nachricht im Ticket-Kanal senden, dass das Ticket gelöscht wird
                await interaction.channel!.send({ content: 'Dieses Ticket wird in 5 Sekunden gelöscht!' })
            })

        // Ticket-Kanal nach 5 Sekunden löschen
        setTimeout(async () => {
            await interaction.channel!.delete()
        }, 5000);
    }
})
