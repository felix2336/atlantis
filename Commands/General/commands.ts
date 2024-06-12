import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, Colors, AutoModerationActionExecution } from 'discord.js'
import { MyClient, SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Gibt alle Slash Commands des Bots wieder'),

    async execute(interaction: ChatInputCommandInteraction, client: MyClient) {
        const embed = new EmbedBuilder({
            title: 'Slash Commands',
            description: `\`${client.commands.map((c, k) => `/${k} - ${c.data.description}`).sort().join('\`\n\n\`')}\``,
            color: Colors.Gold
        })

        await interaction.reply({embeds: [embed]})
    }
}
export default command