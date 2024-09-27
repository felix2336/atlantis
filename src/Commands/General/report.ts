import { ChatInputCommandInteraction, EmbedBuilder, Colors, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { SlashCommand } from 'dcbot'

// Definition eines neuen Slash-Befehls namens 'report'
export default new SlashCommand({
    // Definition der Befehlsdaten
    data: new SlashCommandBuilder()
        .setName('report') // Name des Befehls
        .setDescription('Melde einen User an das Serverteam') // Beschreibung des Befehls
        .addUserOption(option => option.setName('user').setDescription('Der zu meldende User').setRequired(true)) // Benutzer-Option
        .addStringOption(input => input.setName('reason').setDescription('Grund für die Meldung').setRequired(true)) // Grund-Option
        .addAttachmentOption(input => input.setName('image').setDescription('Erlaubte Dateien: png, jpg, jpeg, webp')) // Bild-Option
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Standard-Berechtigung für Server-Administratoren

    // Ausführung des Befehls
    async execute(interaction) {
        // Abrufen des gemeldeten Benutzers
        const user = interaction.options.getUser('user')
        // Abrufen des Grundes für die Meldung
        const reason = interaction.options.getString('reason')
        // Abrufen des Bildes (falls vorhanden)
        const attachment = interaction.options.getAttachment('image')

        // Erstellung eines neuen Embeds für die Meldung
        const embed = new EmbedBuilder({
            title: 'Neuer Report', // Titel des Embeds
            description: `${user} wurde von ${interaction.member} gemeldet. Grund für die Meldung:\n***${reason}***`, // Beschreibung des Embeds
            color: Colors.DarkOrange, // Farbe des Embeds
            timestamp: new Date() // Zeitstempel des Embeds
        })

        // Überprüfung, ob ein Bild angehängt wurde
        if (attachment) {
            // Überprüfung, ob das Bild eine erlaubte Dateiendung hat
            if (
                attachment.name.endsWith('.png') ||
                attachment.name.endsWith('.jpg') ||
                attachment.name.endsWith('.jpeg') ||
                attachment.name.endsWith('.webp')
            ) {
                // Hinzufügen des Bildes zum Embed
                embed.setImage(attachment.url)
            }
        }

        // Senden des Embeds als Antwort auf die Interaktion
        await interaction.reply({ embeds: [embed] })
    }
})
