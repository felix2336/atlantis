import { Modal } from "dcbot";
import { ModalSubmitInteraction } from "discord.js";

export default new Modal({
    id: 'ce_footer',

    async execute(interaction: ModalSubmitInteraction){
        const text = interaction.fields.getTextInputValue('text')
        const url = interaction.fields?.getTextInputValue('url')

        //@ts-ignore
        const embed = interaction.message.embeds[0]
        //@ts-ignore
        embed.data.footer = {
            text: text,
            icon_url: url || undefined
        }
        await interaction.reply({content: 'Der Footer wurde erfolgreich geändert!', ephemeral: true})
        //@ts-ignore
        await interaction.message.edit({embeds: [embed]})
    }
})