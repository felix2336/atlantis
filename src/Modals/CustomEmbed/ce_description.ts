import { Modal } from "dcbot";
import { EmbedBuilder } from "discord.js";

export default new Modal({
    id: 'ce_description',

    async execute(interaction) {
        const description = interaction.fields.getTextInputValue('description')
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])
        embed.data.description = description
        interaction.reply({ content: 'Die Beschreibung wurde erfolgreich geändert', ephemeral: true })
        await interaction.deferUpdate().then(response => response.edit({ embeds: [embed] }))
    }
})