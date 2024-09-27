import { ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, GuildMember, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { SlashCommand } from 'dcbot'

export default new SlashCommand({
    // Daten für den Befehl
    data: new SlashCommandBuilder()
        .setName('abmeldung')
        .setDescription('Melde dich für einen gewissen Zeitraum vom Team ab'),

    // Funktion, die ausgeführt wird, wenn der Befehl aufgerufen wird
    async execute(interaction: ChatInputCommandInteraction) {
        // Überprüfe, ob der Benutzer ein Teammitglied ist
        const member = interaction.member as GuildMember
        if (!member.roles.cache.has('1156298949301379212')) {
            // Wenn nicht, sende eine private Nachricht mit einer Fehlermeldung
            interaction.reply({ content: 'Du bist nicht im Team :wink:', ephemeral: true })
            return
        }

        // Erstelle ein neues Modal-Fenster
        const modal = new ModalBuilder({
            title: 'Abmeldung',
            customId: 'abmeldung'
        })

        // Erstelle ein Texteingabefeld für den Grund der Abmeldung
        const reason = new TextInputBuilder({
            customId: 'reason',
            label: 'Was ist der Grund für deine Abmeldung?',
            required: true,
            style: TextInputStyle.Short,
            placeholder: 'z.B. Ich bin im Urlaub mit meiner Familie'
        })

        // Erstelle ein Texteingabefeld für den Zeitraum der Abwesenheit
        const zeitraum = new TextInputBuilder({
            customId: 'zeitraum',
            label: 'In welchem Zeitraum bist du abwesend?',
            required: true,
            style: TextInputStyle.Short,
            placeholder: 'z.B. 10.05. - 26.05.',
        })

        // Erstelle ein Texteingabefeld für sonstige Bemerkungen
        const bemerkungen = new TextInputBuilder({
            customId: 'bemerkungen',
            label: 'Sonstige Bemerkungen',
            style: TextInputStyle.Paragraph,
            required: false,
            maxLength: 1024
        })

        // Erstelle Zeilen für die Texteingabefelder
        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(reason)
        const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(zeitraum)
        const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(bemerkungen)

        // Füge die Zeilen zum Modal-Fenster hinzu
        modal.addComponents(row, row1, row2)
        // Zeige das Modal-Fenster an
        await interaction.showModal(modal)
    }
})
