import { SlashCommand } from 'dcbot'
import { SlashCommandBuilder } from 'discord.js'
import Birthdays from '../../Schemas/birthdays';

// Definieren der möglichen Tage und Monate
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1)

export default new SlashCommand({
    // Definition der Slash-Command-Daten
    data: new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Setze deinen Geburtstag')
        .addNumberOption(input => input.setName('day').setDescription('An welchem Tag hast du Geburtstag?').setRequired(true).setAutocomplete(true))
        .addNumberOption(input => input.setName('month').setDescription('In welchem Monat hast du Geburtstag?').setRequired(true).setAutocomplete(true)),

    // Funktion für die Autocomplete-Funktion
    async autocomplete(interaction, client) {
        // Abrufen des aktuellen Optionsfeldes
        const focusedOption = interaction.options.getFocused(true);

        // Prüfen, welches Optionsfeld bearbeitet wird
        switch (focusedOption.name) {
            case 'day': {
                // Filtern der möglichen Tage basierend auf dem aktuellen Eingabewert
                const choices = days.filter(d => d.toString().startsWith(focusedOption.value))
                // Antworten mit den möglichen Tagen
                interaction.respond(choices.map(ch => ({ name: ch.toString(), value: ch })).slice(0, 25))
                break
            }
            case 'month': {
                // Filtern der möglichen Monate basierend auf dem aktuellen Eingabewert
                const choices = months.filter(m => m.toString().startsWith(focusedOption.value))
                // Antworten mit den möglichen Monaten
                interaction.respond(choices.map(ch => ({ name: ch.toString(), value: ch })))
                break
            }
        }
    },

    // Funktion für die Ausführung des Slash-Commands
    async execute(interaction, client) {
        // Verzögern der Antwort, um die Verarbeitung zu ermöglichen
        await interaction.deferReply({ ephemeral: true })
        // Abrufen der eingegebenen Werte
        const day = interaction.options.getNumber('day', true)
        const month = interaction.options.getNumber('month', true)

        // Prüfen, ob die eingegebenen Werte gültig sind
        if (!days.includes(day)) {
            // Fehlermeldung, wenn der Tag ungültig ist
            interaction.editReply({ content: 'Bitte gib einen gültigen Tag ein' })
            return
        }
        if (!months.includes(month)) {
            // Fehlermeldung, wenn der Monat ungültig ist
            interaction.editReply({ content: 'Bitte gib einen gültigen Monat ein' })
            return
        }

        // Abrufen des Benutzers aus der Datenbank
        let dbUser = await Birthdays.findOne({ userId: interaction.user.id })

        // Aktualisieren des Benutzers, wenn er bereits existiert
        if (dbUser) {
            dbUser.day = day
            dbUser.month = month
            await dbUser.save()
        } else {
            // Erstellen eines neuen Benutzers, wenn er nicht existiert
            dbUser = await Birthdays.create({ userId: interaction.user.id, day: day, month: month })
        }

        // Bestätigung, dass der Geburtstag gespeichert wurde
        await interaction.editReply({ content: `Dein Geburtstag wurde gespeichert: \`${day}.${month}\`` })
    },
})
