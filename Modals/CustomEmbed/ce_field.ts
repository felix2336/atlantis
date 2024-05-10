import { ModalSubmitInteraction } from "discord.js";

export default {
    id: 'ce_field',

    async execute(interaction: ModalSubmitInteraction) {
        const fieldnr = parseInt(interaction.fields.getTextInputValue('fieldnr'))
        const fieldName = interaction.fields.getTextInputValue('fieldname')
        const fieldValue = interaction.fields.getTextInputValue('fieldvalue')

        //@ts-ignore
        if(!interaction.message.embeds[0].data.fields){
            //@ts-ignore
            const embed = interaction.message.embeds[0]
            //@ts-ignore
            embed.data.fields = [{name: fieldName, value: fieldValue}]
        }
        //@ts-ignore
        if (interaction.message.embeds[0].fields.length >= fieldnr) {
            //@ts-ignore
            const embed = interaction.message.embeds[0]
            //@ts-ignore
            embed.data.fields[fieldnr - 1].name = fieldName
            //@ts-ignore
            embed.data.fields[fieldnr - 1].value = fieldValue
            await interaction.reply({ content: 'Das Feld wurde erfolgreich geändert', ephemeral: true })
            //@ts-ignore
            await interaction.message.edit({ embeds: [embed] })
            return
        } else {
            //@ts-ignore
            const embed = interaction.message.embeds[0]
            //@ts-ignore
            embed.data.fields.push({ name: fieldName, value: fieldValue, inline: false })
            await interaction.reply({ content: 'Das Feld wurde erfolgreich geändert', ephemeral: true })
            //@ts-ignore
            await interaction.message.edit({ embeds: [embed] })
            return
        }
    }
}