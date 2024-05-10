import { ModalSubmitInteraction, } from "discord.js";

export default {
    id: 'ce_thumbnail',

    async execute(interaction: ModalSubmitInteraction) {
        const url = interaction.fields.getTextInputValue('url')
        //@ts-ignore
        const embed = interaction.message.embeds[0]
        //@ts-ignore
        embed.data.thumbnail = {
            url: url
        }
        interaction.reply({ content: 'Die Beschreibung wurde erfolgreich geändert', ephemeral: true })
        //@ts-ignore
        await interaction.message.edit({ embeds: [embed] })
    }
}