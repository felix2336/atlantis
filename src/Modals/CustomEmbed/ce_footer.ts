import { Modal } from "dcbot";
import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";

export default new Modal({
    // ID des Modals
    id: 'ce_footer',

    // Funktion, die ausgeführt wird, wenn der Modal abgeschickt wird
    async execute(interaction: ModalSubmitInteraction) {
        // Text aus dem Textfeld 'text' auslesen
        const text = interaction.fields.getTextInputValue('text')
        // URL aus dem Textfeld 'url' auslesen (optional)
        const url = interaction.fields?.getTextInputValue('url')

        // Embed aus der ersten Nachricht auslesen und bearbeiten
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])
        // Footer des Embeds bearbeiten
        embed.data.footer = {
            // Text des Footers setzen
            text: text,
            // Icon-URL des Footers setzen (optional)
            icon_url: url || undefined
        }
        // Bestätigungsnachricht senden
        await interaction.reply({ content: 'Der Footer wurde erfolgreich geändert!', ephemeral: true })
        // Nachricht bearbeiten
        await interaction.message!.edit({ embeds: [embed] })
    }
})
