import { ButtonInteraction, Client, Colors, EmbedBuilder, TextChannel } from "discord.js";
import { Channels } from "../../contents";

export default {
    id: 'cr_accept',

    async execute(interaction: ButtonInteraction, client: Client) {
        if (interaction.user.username != (interaction.channel as TextChannel).name.split('-')[1]) return interaction.reply({ content: 'Nur der Ersteller des Tickets darf diesen Button drücken!', ephemeral: true });
        
        const logChannel = client.channels.cache.get(Channels.ticket_log) as TextChannel
        const username = (interaction.channel as TextChannel).name.split('-')[1]
        const member = interaction.guild!.members.cache.find(user => user.user.username == username)
        
        const logEmbed = new EmbedBuilder({
            title: 'Ticket geschlossen',
            fields: [
                { name: 'Ersteller', value: `${member}`, inline: true },
                { name: 'Geschlossen von', value: `${interaction.member}`, inline: true },
                { name: 'Erstellungsdatum', value: `${interaction.channel?.createdAt?.toLocaleDateString()}`, inline: false },
                { name: 'Grund der Schließung', value: interaction.message.embeds[0].description!.split('\`\`\`')[1] }
            ],
            color: Colors.Green,
            timestamp: new Date
        })

        const userEmbed = new EmbedBuilder(logEmbed.data).setAuthor({ name: interaction.guild!.name, iconURL: interaction.guild!.iconURL() || '' })
        await logChannel.send({ embeds: [logEmbed] })
        await member!.send({ embeds: [userEmbed] }).catch(console.log)
        await interaction.channel!.delete()
    }
}