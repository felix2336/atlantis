import { ModalSubmitInteraction, EmbedBuilder, TextChannel } from "discord.js";
import { Channels } from 'contents'
import { Modal } from "dcbot";

export default new Modal({
    // ID des Modals
    id: 'unban-request',

    // Funktion, die ausgeführt wird, wenn das Modal abgeschickt wird
    async execute(interaction) {
        // Erstelle ein neues Embed, um die Entbannungsanfrage darzustellen
        const embed = new EmbedBuilder({
            // Titel des Embeds
            title: 'Entbannungsantrag',
            // Beschreibung des Embeds
            description: `${interaction.user} (${interaction.user.username}) möchte entbannt werden!`,
            // Felder des Embeds
            fields: [
                // Mappe die Felder des Modals auf die Felder des Embeds
                ...interaction.fields.fields.map((field, key, collection) => {
                    return { name: key, value: field.value }
                })
            ]
        })
        // Hole den Kanal, in dem die Entbannungsanfrage gesendet werden soll
        const channel = interaction.client.channels.cache.get(Channels.unban_requests) as TextChannel

        // Sende die Entbannungsanfrage in den Kanal
        await channel.send({ embeds: [embed] })
    }
})
