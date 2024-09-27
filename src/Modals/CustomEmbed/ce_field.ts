import { Modal } from "dcbot";
import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";

export default new Modal({
    id: 'ce_field',

    async execute(interaction: ModalSubmitInteraction) {
        // Eingabe der Feldnummer, Feldname und Feldwert aus dem Modal
        const fieldnr = parseInt(interaction.fields.getTextInputValue('fieldnr'))
        const fieldName = interaction.fields.getTextInputValue('fieldname')
        const fieldValue = interaction.fields.getTextInputValue('fieldvalue')

        // Erstelle ein neues Embed-Objekt aus dem bestehenden Embed
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])

        // Überprüfung, ob das Feld bereits existiert
        if (!interaction.message!.embeds[0].data.fields) {
            // Wenn nicht, erstelle ein neues Feld
            embed.data.fields = [{ name: fieldName, value: fieldValue }]
        }

        // Überprüfung, ob die Feldnummer innerhalb des gültigen Bereichs liegt
        if (embed.data.fields!.length >= fieldnr) {
            // Wenn ja, ändere den Feldnamen und -wert
            embed.data.fields![fieldnr - 1].name = fieldName
            embed.data.fields![fieldnr - 1].value = fieldValue
            // Bestätigungsnachricht an den Benutzer senden
            await interaction.reply({ content: 'Das Feld wurde erfolgreich geändert', ephemeral: true })
            // Die Änderungen im Embed speichern
            await interaction.message!.edit({ embeds: [embed] })
            return
        } else {
            // Wenn die Feldnummer nicht innerhalb des gültigen Bereichs liegt, füge ein neues Feld hinzu
            const embed = EmbedBuilder.from(interaction.message!.embeds[0])
            embed.data.fields!.push({ name: fieldName, value: fieldValue, inline: false })
            // Bestätigungsnachricht an den Benutzer senden
            await interaction.reply({ content: 'Das Feld wurde erfolgreich geändert', ephemeral: true })
            // Die Änderungen im Embed speichern
            await interaction.message!.edit({ embeds: [embed] })
            return
        }
    }
})
