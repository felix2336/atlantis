import { SlashCommand } from 'dcbot'
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('minecraft')
        .setDescription('Zeigt die IP des Minecraft Servers an'),

    async execute(interaction, client) {
        const embed = new EmbedBuilder({
            title: 'Atlantis Lounge Minecraft',
            description: `**Der Minecraft Server befindet sich auf der Version 1.20.6**\n\n**IP:**\n\`\`\`31.214.243.32:25568\`\`\``
        })

        await interaction.reply({embeds: [embed], ephemeral: true})
    },
})