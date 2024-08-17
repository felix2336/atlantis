import { Modal } from "dcbot";
import { ModalSubmitInteraction } from "discord.js";

export default new Modal({
    id: 'ce_color',

    async execute(interaction: ModalSubmitInteraction) {
        const code = interaction.fields.getTextInputValue('code')
        //@ts-ignore
        const embed = interaction.message.embeds[0]
        if (!/^#[0-9A-F]{6}$/i.test(code)) {
            interaction.reply({ content: 'Das ist kein gültiger Hex Color Code!', ephemeral: true })
            return
        }
        //@ts-ignore
        embed.data.color = parseInt(code.replace('#', '0x'))
        interaction.reply({ content: 'Die Farbe wurde erfolgreich geändert', ephemeral: true })
        //@ts-ignore
        await interaction.message.edit({ embeds: [embed] })
    }
})