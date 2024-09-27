import { Modal } from 'dcbot'
import { EmbedBuilder, ModalSubmitInteraction, TextBasedChannel, } from 'discord.js'

export default new Modal({
    // ID des Modals
    id: 'ce_send',

    // Funktion, die ausgeführt wird, wenn das Modal abgeschickt wird
    async execute(interaction: ModalSubmitInteraction) {
        // Ermitteln der Channel-ID aus dem Textinputfeld
        const id = interaction.fields.getTextInputValue('channel')

        // Abrufen des Channels aus der Channel-Liste des Servers
        const channel = interaction.guild!.channels.cache.get(id) as TextBasedChannel

        // Überprüfen, ob der Channel existiert
        if (!channel) {
            // Wenn der Channel nicht existiert, eine Fehlermeldung senden
            interaction.reply({ content: 'Die angegebene ID führt zu keinem Channel auf diesem Server', ephemeral: true })
            return
        }

        // Erstellen eines Embeds aus dem ersten Embed der Nachricht
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])

        // Bestätigungsnachricht senden
        await interaction.reply({ content: `Das Embed wird in ${channel} geschickt!`, ephemeral: true })

        // Embed in den Channel senden
        await channel.send({ embeds: [embed] })
    }
})
