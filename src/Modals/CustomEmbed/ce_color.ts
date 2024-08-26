import { Modal } from "dcbot";
import { EmbedBuilder } from "discord.js";

export default new Modal({
    id: 'ce_color',

    async execute(interaction) {
        const code = interaction.fields.getTextInputValue('code')
        const embed = EmbedBuilder.from(interaction.message!.embeds[0])
        if (!/^#[0-9A-F]{6}$/i.test(code)) {
            interaction.reply({ content: 'Das ist kein gültiger Hex Color Code!', ephemeral: true })
            return
        }
        embed.data.color = parseInt(code.replace('#', '0x'))
        interaction.reply({ content: 'Die Farbe wurde erfolgreich geändert', ephemeral: true })
        await interaction.deferUpdate().then(response => response.edit({ embeds: [embed] }))
    }
})