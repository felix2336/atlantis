import { Modal } from "dcbot";
import { EmbedBuilder, ModalSubmitInteraction, PermissionFlagsBits } from "discord.js";

export default new Modal({
    // ID des Modals
    id: 'ce_title',

    // Funktion, die ausgeführt wird, wenn der Modal abgeschickt wird
    async execute(interaction: ModalSubmitInteraction) {
        // Wert des Titel-Textfelds auslesen
        const title = interaction.fields.getTextInputValue('title')

        // Embed aus der Nachricht erstellen
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])

        // Titel des Embeds ändern
        embed.data.title = title

        // Bestätigungsnachricht senden
        interaction.reply({ content: 'Der Titel wurde erfolgreich geändert', ephemeral: true })

        // Nachricht mit dem geänderten Embed aktualisieren
        await interaction.message!.edit({ embeds: [embed] })
    }
})
