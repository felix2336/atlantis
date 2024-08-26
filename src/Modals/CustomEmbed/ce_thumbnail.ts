import { Modal } from "dcbot";
import { EmbedBuilder, ModalSubmitInteraction, } from "discord.js";

export default new Modal({
    id: 'ce_thumbnail',

    async execute(interaction: ModalSubmitInteraction) {
        const url = interaction.fields.getTextInputValue('url')
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])
        embed.data.thumbnail = {
            url: url
        }
        interaction.reply({ content: 'Die Beschreibung wurde erfolgreich geändert', ephemeral: true })
        await interaction.deferUpdate().then(response => response.edit({ embeds: [embed] }))
    }
})