import { Modal } from 'dcbot'
import { ModalSubmitInteraction } from 'discord.js'

export default new Modal({
    // ID des Modals
    id: 'update_task',

    // Funktion, die ausgeführt wird, wenn der Modal abgeschickt wird
    async execute(interaction: ModalSubmitInteraction) {
        // Wert des Textinputs 'update' aus dem Modal auslesen
        const update = interaction.fields.getTextInputValue('update')

        // Bestätigungsnachricht an den Nutzer senden
        await interaction.reply({ content: 'Das Update wurde gepostet', ephemeral: true })

        // Update im Embed hinzufügen
        interaction.message!.embeds[0].fields.push({ name: `Update vom ${new Date().toLocaleDateString('de')}`, value: update })
        // Embed aktualisieren
        await interaction.message!.edit({ embeds: [interaction.message!.embeds[0]] })
    }
})
