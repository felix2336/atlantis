import { Modal } from "dcbot";
import { ModalSubmitInteraction, PermissionFlagsBits } from "discord.js";

export default new Modal({
    // ID des Modals
    id: 'ce_description',

    // Funktion, die ausgeführt wird, wenn der Modal abgeschickt wird
    async execute(interaction: ModalSubmitInteraction) {
        // Beschreibung aus dem Modal-Input-Feld auslesen
        const description = interaction.fields.getTextInputValue('description')

        // Erstes Embed des Nachrichten-Objekts auslesen
        //@ts-ignore
        const embed = interaction.message.embeds[0]

        // Beschreibung des Embeds aktualisieren
        //@ts-ignore
        embed.data.description = description

        // Bestätigungsnachricht senden
        interaction.reply({ content: 'Die Beschreibung wurde erfolgreich geändert', ephemeral: true })

        // Nachricht mit dem aktualisierten Embed aktualisieren
        //@ts-ignore
        await interaction.message.edit({ embeds: [embed] })
    }
})
