import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import { SlashCommand } from "dcbot";
import Bumps from '../../Schemas/bumps'

export default new SlashCommand({
    data: new SlashCommandBuilder() 
        .setName('bumps')
        .setDescription('Sehe, wie oft du schon gebumpt hast'),

    async execute(interaction, client) {
        const embed = new EmbedBuilder({
            color: Colors.Gold,
            description: ''
        })
        await Bumps.findOne({userId: interaction.user.id})
            .then(User => {
                embed.data.description = `Du hast bisher ${User?.bumps || 0} mal gebumpt`
            })

        interaction.reply({embeds: [embed], ephemeral: true})
    },
})