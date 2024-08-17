import { Client, ModalSubmitInteraction, TextChannel } from "discord.js";
import { Channels, Suggestion } from "../../contents";
import { Modal } from "dcbot";

export default new Modal({
    id: 'suggestion',

    async execute(interaction, client) {
        const type = interaction.fields.getTextInputValue('type')
        if (type != '1' && type != '2') {
            interaction.reply({ content: `Ungültiger Typ`, ephemeral: true })
            return
        }
        const suggestionText = interaction.fields.getTextInputValue('suggestion')
        const channel = client.channels.cache.get(Channels.suggestion) as TextChannel

        const suggestion = new Suggestion({
            user: interaction.user.id,
            suggestion: suggestionText,
            type: parseInt(type)
        })

        await suggestion.submit(channel)
        interaction.reply({ content: `Dein Vorschlag wurde erfolgreich eingereicht`, ephemeral: true });
    }
})