import { Modal } from "dcbot";
import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";

export default new Modal({
    id: 'ce_field',

    async execute(interaction: ModalSubmitInteraction) {
        const fieldnr = parseInt(interaction.fields.getTextInputValue('fieldnr'))
        const fieldName = interaction.fields.getTextInputValue('fieldname')
        const fieldValue = interaction.fields.getTextInputValue('fieldvalue')
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])
        if (!embed.data.fields) {
            embed.data.fields = [{ name: fieldName, value: fieldValue }]
        }
        if (embed.data.fields.length >= fieldnr) {
            embed.data.fields[fieldnr - 1].name = fieldName
            embed.data.fields[fieldnr - 1].value = fieldValue
            await interaction.reply({ content: 'Das Feld wurde erfolgreich geändert', ephemeral: true })
            await interaction.deferUpdate().then(response => response.edit({ embeds: [embed] }))
            return
        } else {
            embed.data.fields.push({ name: fieldName, value: fieldValue, inline: false })
            await interaction.reply({ content: 'Das Feld wurde erfolgreich geändert', ephemeral: true })
            await interaction.deferUpdate().then(response => response.edit({ embeds: [embed] }))
            return
        }
    }
})