import { Client, ModalSubmitInteraction, TextChannel } from "discord.js";
import { Channels, Suggestion } from "contents";
import { Modal } from "dcbot";

export default new Modal({
    id: 'suggestion',

    // Funktion, die aufgerufen wird, wenn das Modal ausgeführt wird
    async execute(interaction, client) {
        // Ermitteln des ausgewählten Typs
        const type = interaction.fields.getTextInputValue('type')

        // Überprüfen, ob der Typ gültig ist
        if (type != '1' && type != '2') {
            // Wenn der Typ ungültig ist, wird eine Fehlermeldung gesendet
            interaction.reply({ content: `Ungültiger Typ`, ephemeral: true })
            return
        }

        // Ermitteln des Vorschlagstextes
        const suggestionText = interaction.fields.getTextInputValue('suggestion')

        // Ermitteln des Kanals, in dem der Vorschlag gesendet werden soll
        const channel = client.channels.cache.get(Channels.suggestion) as TextChannel

        // Erstellen eines neuen Vorschlags
        const suggestion = new Suggestion({
            user: interaction.user.id,
            suggestion: suggestionText,
            type: parseInt(type)
        })

        // Senden des Vorschlags
        await suggestion.submit(channel)

        // Bestätigung, dass der Vorschlag erfolgreich gesendet wurde
        interaction.reply({ content: `Dein Vorschlag wurde erfolgreich eingereicht`, ephemeral: true });
    }
})
