import { ButtonInteraction } from "discord.js";

export default {
    id: 'close-decline',

    async execute(interaction: ButtonInteraction){
        await interaction.reply({content: 'okay', ephemeral: true})
        await interaction.message.delete()
    }
}