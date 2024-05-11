import { ButtonInteraction, Colors, EmbedBuilder, TextChannel } from "discord.js";

export default {
    id: 'cr_decline',

    async execute(interaction: ButtonInteraction) {
        if(interaction.user.username != (interaction.channel as TextChannel).name.split('-')[1]) return interaction.reply({content: 'Nur der Ersteller des Tickets darf diesen Button drücken!', ephemeral: true});

        const embed = new EmbedBuilder({
            title: 'Schließ-Anfrage',
            description: `${interaction.member} hat die Schließ-Anfrage abgelehnt!`,
            color: Colors.Red
        })

        await interaction.message.edit({content: '', embeds: [embed], components: []})
        await interaction.reply({content: 'Du hast die Schließ-Anfrage abgelehnt!', ephemeral: true})
    }
}