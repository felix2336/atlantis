import { SlashCommandBuilder, PermissionFlagsBits, ActivityType } from "discord.js";
import { SlashCommand, ConsoleWarning } from "../../contents";
const cw = new ConsoleWarning

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stoppe den Bot')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        interaction.reply({content: 'Der Bot wird gestoppt', ephemeral: true})
        client.user!.setActivity({
            name: 'offline',
            state: 'Bot Offline',
            type: ActivityType.Custom
        })
        await client.destroy()
        cw.show(`${interaction.user.username} (${interaction.user.id}) hat den Bot gestoppt!`)
    },
}

export default command