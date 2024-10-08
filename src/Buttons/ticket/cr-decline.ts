import { Button } from "dcbot";
import { Colors, EmbedBuilder, TextChannel } from "discord.js";

export default new Button({
    id: 'cr_decline',

    async execute(interaction) {
        if (interaction.user.id != (interaction.channel as TextChannel).name.split('-')[1]) {
            interaction.reply({ content: 'Nur der Ersteller des Tickets darf diesen Button drücken!', ephemeral: true });
            return
        }

        const embed = new EmbedBuilder({
            title: 'Schließ-Anfrage',
            description: `${interaction.member} hat die Schließ-Anfrage abgelehnt!`,
            color: Colors.Red
        })

        await interaction.message.edit({ content: '', embeds: [embed], components: [] })
        await interaction.reply({ content: 'Du hast die Schließ-Anfrage abgelehnt!', ephemeral: true })
    }
})