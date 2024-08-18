import { ModalSubmitInteraction, EmbedBuilder, TextChannel } from "discord.js";
import { Channels } from 'contents'
import { Modal } from "dcbot";

export default new Modal({
    id: 'unban-request',

    async execute(interaction) {
        const embed = new EmbedBuilder({
            title: 'Entbannungsantrag',
            description: `${interaction.user} (${interaction.user.username}) möchte entbannt werden!`,
            fields: [
                ...interaction.fields.fields.map((field, key, collection) => {
                    return { name: key, value: field.value }
                })
            ]
        })
        const channel = interaction.client.channels.cache.get(Channels.unban_requests) as TextChannel

        await channel.send({ embeds: [embed] })
    }
})