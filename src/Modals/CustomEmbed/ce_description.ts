import { Modal } from "dcbot";
import { ModalSubmitInteraction, PermissionFlagsBits } from "discord.js";

export default new Modal({
    id: 'ce_description',

    async execute(interaction: ModalSubmitInteraction) {
        const description = interaction.fields.getTextInputValue('description')
        //@ts-ignore
        const embed = interaction.message.embeds[0]
        //@ts-ignore
        embed.data.description = description
        interaction.reply({ content: 'Die Beschreibung wurde erfolgreich geändert', ephemeral: true })
        //@ts-ignore
        await interaction.message.edit({ embeds: [embed] })
    }
})