import { Modal } from "dcbot";
import { ModalSubmitInteraction } from "discord.js";

export default new Modal({
    // ID des Modals
    id: 'ce_color',

    // Funktion, die aufgerufen wird, wenn der Modal abgeschickt wird
    async execute(interaction: ModalSubmitInteraction) {
        // Wert des Textfelds 'code' auslesen
        const code = interaction.fields.getTextInputValue('code')

        // Erstes Embed der Nachricht auslesen
        const embed = interaction.message!.embeds[0]

        // Überprüfen, ob der eingegebene Code ein gültiger Hex-Farbcode ist
        if (!/^#[0-9A-F]{6}$/i.test(code)) {
            // Wenn nicht, Fehlermeldung senden und Funktion beenden
            interaction.reply({ content: 'Das ist kein gültiger Hex Color Code!', ephemeral: true })
            return
        }

        // Den Farbwert des Embeds ändern
        //@ts-ignore
        embed.data.color = parseInt(code.replace('#', '0x'))

        // Erfolgsmeldung senden
        interaction.reply({ content: 'Die Farbe wurde erfolgreich geändert', ephemeral: true })

        // Die Nachricht mit dem geänderten Embed aktualisieren
        await interaction.message!.edit({ embeds: [embed] })
    }
})
