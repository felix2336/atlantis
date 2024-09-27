import { Modal } from "dcbot";
import { EmbedBuilder, ModalSubmitInteraction, } from "discord.js";

export default new Modal({
    // ID des Modals
    id: 'ce_thumbnail',

    // Funktion, die ausgeführt wird, wenn der Modal abgeschickt wird
    async execute(interaction: ModalSubmitInteraction) {
        // URL aus dem Textinputfeld 'url' auslesen
        const url = interaction.fields.getTextInputValue('url')

        // Embed aus der ersten Nachricht auslesen und bearbeiten
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])

        // Thumbnail-URL im Embed setzen
        embed.data.thumbnail = {
            url: url
        }

        // Bestätigungsnachricht senden
        interaction.reply({ content: 'Die Beschreibung wurde erfolgreich geändert', ephemeral: true })

        // Nachricht mit dem bearbeiteten Embed aktualisieren
        await interaction.message!.edit({ embeds: [embed] })
    }
})
