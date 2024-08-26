import { Modal } from "dcbot";
import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";

export default new Modal({
    id: 'ce_footer',

    async execute(interaction: ModalSubmitInteraction) {
        const text = interaction.fields.getTextInputValue('text')
        const url = interaction.fields?.getTextInputValue('url')

        const embed = EmbedBuilder.from(interaction.message!.embeds[0])
        embed.data.footer = {
            text: text,
            icon_url: url || undefined
        }
        await interaction.reply({ content: 'Der Footer wurde erfolgreich geändert!', ephemeral: true })
        await interaction.deferReply().then(response => response.edit({ embeds: [embed] }))
    }
})