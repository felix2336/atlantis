import { Client, ModalSubmitInteraction, TextChannel } from "discord.js";
import { Suggestion } from "contents";
import { Channels } from "../../contents";

export default {
    id: 'suggestion',

    async execute(interaction: ModalSubmitInteraction, client: Client) {
        const type = interaction.fields.getTextInputValue('type')
        if (type != '1' && type != '2') return interaction.reply({ content: `Ungültiger Typ`, ephemeral: true })
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
}