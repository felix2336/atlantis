import { Channels } from "contents";
import { Button } from "dcbot";
import { ButtonInteraction, ForumChannel, TextChannel } from "discord.js";

export default new Button({
    id: 'close-confirm',

    async execute(interaction, client) {
        await interaction.reply({ content: 'Dieses Ticket wurde geschlossen und wird innerhalb weniger Sekunden gelöscht!' })
        setTimeout(async () => {
            await interaction.channel!.delete()
        }, 3500)

        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel
        const transkript = transkripts.threads.cache.find(ch => ch.name == (interaction.channel as TextChannel).name)!

        await transkript.setName(`${transkript.name}-closed`).catch(client.logger.error)
    }
})