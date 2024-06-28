import { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from 'dcbot'

export default new SlashCommand( {
    data: new SlashCommandBuilder()
        .setName('fetchowner')
        .setDescription('Fetch the owner of this discord Server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const owner = await interaction.guild!.fetchOwner()
        const embed = new EmbedBuilder({
            title: 'JSON',
            description: `\`\`\`json\n${JSON.stringify((await owner.fetch()).toJSON(), null, 3)}\n\`\`\``
        })
        await interaction.reply({content: `Owner: ${owner}\nUsername: **${owner.user.username}**\nUserID: **${owner.user.id}**\nDisplay-Name: **${owner.displayName}**\n`,embeds: [embed], ephemeral: true})
    },
})