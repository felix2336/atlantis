import { ButtonInteraction, Colors, EmbedBuilder, GuildMember } from "discord.js";
import { Roles } from "contents";
import { Button } from "dcbot";

export default new Button({
    id: 'claim',

    async execute(interaction) {
        if(!(interaction.member as GuildMember).roles.cache.has(Roles.staff)) {
            interaction.reply({content: 'Nur Teammitglieder können Tickets claimen', ephemeral: true})
            return
        }
        const embed = new EmbedBuilder({
            title: 'Beanspruchtes Ticket',
            description: `Dieses Ticket wird von ${interaction.member} bearbeitet.`,
            color: Colors.Green
        })
        const components = interaction.message.components[0]
        components.components.pop()
        await interaction.message.edit({components: [components]})
        await interaction.reply({embeds: [embed]})
    }
})