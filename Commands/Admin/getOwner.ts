import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('fetchowner')
        .setDescription('Fetch the owner of this discord Server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const owner = await interaction.guild!.fetchOwner()
        await interaction.reply({content: `Owner: ${owner}\nUsername: **${owner.user.username}**\nUserID: **${owner.user.id}**\nDisplay-Name: **${owner.displayName}**`})
    },
}
export default command