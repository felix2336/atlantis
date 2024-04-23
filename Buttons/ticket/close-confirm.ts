import { ButtonInteraction } from "discord.js";

export default {
    id: 'close-confirm',

    async execute(interaction: ButtonInteraction){
        await interaction.reply({content: 'Dieses Ticket wurde geschlossen und wird innerhalb weniger Sekunden gelöscht!'})
        setTimeout(async () => {
            await interaction.channel!.delete()
        }, 3500)
    }
}