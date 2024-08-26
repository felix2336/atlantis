import { Modal } from "dcbot";
import { EmbedBuilder, ModalSubmitInteraction, PermissionFlagsBits } from "discord.js";

export default new Modal({
    id: 'ce_title',

    async execute(interaction: ModalSubmitInteraction) {
        const title = interaction.fields.getTextInputValue('title')
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])
        embed.data.title = title
        interaction.reply({ content: 'Der Titel wurde erfolgreich geändert', ephemeral: true })
        await interaction.deferUpdate().then(response => response.edit({ embeds: [embed] }))
    }
})