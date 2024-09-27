import { ChatInputCommandInteraction, Client, ApplicationCommandOptionType, PermissionFlagsBits, ChannelType, SlashCommandBuilder, GuildTextBasedChannel } from 'discord.js';
import { SlashCommand } from 'dcbot';

export default new SlashCommand({
    // Definition der Kommandodaten
    data: new SlashCommandBuilder()
        .setName('fullclear')
        .setDescription('Lösche alle Nachrichten in diesem Kanal')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    // Ausführung des Kommandos
    async execute(interaction, client) {
        // Abrufen des Kanals, in dem das Kommando ausgeführt wird
        const channel = interaction.channel as GuildTextBasedChannel;

        // Antwort auf die Interaktion verzögern, um eine Antwort zu ermöglichen
        await interaction.deferReply({ ephemeral: true })

        // Anfangsstatusmeldung senden
        await interaction.editReply('Vorgang: ``Fetching Messages``')

        // Abrufen der Nachrichten im Kanal (max. 100 Nachrichten)
        let messagesToDelete = await channel.messages.fetch({ limit: 100 })

        // Solange Nachrichten im Kanal vorhanden sind
        while (messagesToDelete.size > 0) {
            // Statusmeldung senden, um den Benutzer über den Fortschritt zu informieren
            await interaction.editReply(`Vorgang: \`\`Deleting ${messagesToDelete.size} Messages\`\``)

            // Löschen der Nachrichten
            const promise = messagesToDelete.map(message => {
                // Prüfen, ob die Nachricht gelöscht werden kann
                if (message.deletable) {
                    // Löschen der Nachricht und Fehlerbehandlung
                    return message.delete().catch(err => console.log(err))
                }
            })

            // Warten, bis alle Nachrichten gelöscht wurden
            await Promise.all(promise)

            // Statusmeldung senden, um den Benutzer über den Fortschritt zu informieren
            await interaction.editReply(`Vorgang: \`\`Fetching Messages\`\``)

            // Abrufen der nächsten Nachrichten im Kanal (max. 100 Nachrichten)
            messagesToDelete = await channel.messages.fetch({ limit: 100 })
        }

        // Abschlussmeldung senden
        await interaction.editReply('Channel cleared!').catch(err => console.log(err))
    }
})
