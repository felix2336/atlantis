import { ButtonInteraction, Colors, EmbedBuilder, GuildMember } from "discord.js";
import { Roles } from "../../contents";

export default {
    id: 'claim',

    async execute(interaction: ButtonInteraction) {
        if(!(interaction.member as GuildMember).roles.cache.has(Roles.staff)) return interaction.reply({content: 'Nur Teammitglieder können Tickets claimen', ephemeral: true})
        const embed = new EmbedBuilder({
            title: 'Beanspruchtes Ticket',
            description: `Dieses Ticket wird von ${interaction.member} bearbeitet.`,
            color: Colors.Green
        })

        await interaction.reply({embeds: [embed]})
    }
}