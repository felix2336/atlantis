import { ModalSubmitInteraction, PermissionFlagsBits } from "discord.js";

export default {
    id: 'ce_title',

    async execute(interaction: ModalSubmitInteraction) {
        const title = interaction.fields.getTextInputValue('title')
        //@ts-ignore
        const embed = interaction.message.embeds[0]
        //@ts-ignore
        embed.data.title = title
        interaction.reply({ content: 'Der Titel wurde erfolgreich geändert', ephemeral: true })
        //@ts-ignore
        await interaction.message.edit({ embeds: [embed] })
    }
}