import { Modal } from "dcbot";
import { EmbedBuilder, ModalSubmitInteraction, } from "discord.js";

export default new Modal({
    // ID des Modals
    id: 'ce_image',

    // Funktion, die ausgeführt wird, wenn der Modal abgeschickt wird
    async execute(interaction: ModalSubmitInteraction) {
        // URL des Bildes aus dem Textinputfeld holen
        const url = interaction.fields.getTextInputValue('url')

        // Embed aus der Nachricht holen und bearbeiten
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])

        // Bild-URL im Embed setzen
        embed.data.image = {
            url: url
        }

        // Bestätigungsnachricht senden
        interaction.reply({ content: 'Das Bild wurde erfolgreich geändert', ephemeral: true })

        // Nachricht mit dem bearbeiteten Embed aktualisieren
        await interaction.message!.edit({ embeds: [embed] })
    }
})
