import { Modal } from "dcbot";
import { ModalSubmitInteraction, } from "discord.js";

export default new Modal({
    id: 'ce_image',

    async execute(interaction: ModalSubmitInteraction) {
        const url = interaction.fields.getTextInputValue('url')
        //@ts-ignore
        const embed = interaction.message.embeds[0]
        //@ts-ignore
        embed.data.image = {
            url: url
        }
        interaction.reply({ content: 'Das Bild wurde erfolgreich geändert', ephemeral: true })
        //@ts-ignore
        await interaction.message.edit({ embeds: [embed] })
    }
})