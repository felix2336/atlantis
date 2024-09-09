import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Colors, GuildMember } from "discord.js";
import { Roles } from "contents";
import { Button } from "dcbot";

export default new Button({
    id: 'close',

    async execute(interaction) {
        if (!(interaction.member as GuildMember).roles.cache.has(Roles.staff)) {
            interaction.reply({ content: 'Nur Teammitglieder dürfen Tickets schließen', ephemeral: true })
            return
        }
        const embed = new EmbedBuilder({
            title: 'Schließung bestätigen',
            description: 'Bitte bestätige mit dem Button unter dieser Nachricht, dass du das Ticket schließen möchtest',
            color: Colors.Blue
        })

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder({
                label: 'Bestätigen',
                style: 1,
                customId: 'close-confirm',
            })
        ])

        await interaction.reply({ embeds: [embed], components: [row] })
    }
})