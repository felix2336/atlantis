import { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionFlagsBits, ChatInputCommandInteraction, Client, TextChannel, Colors, ButtonStyle, GuildMember } from 'discord.js'
import { Categories, Roles } from '../../contents'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('closerequest')
        .setDescription('Beantrage die Schließung des aktuellen Tickets')
        .addStringOption(input => input.setName('reason').setDescription('Der Grund für die Schließung').setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction, client: Client) {
        if(!(interaction.member as GuildMember).roles.cache.has(Roles.staff)) return interaction.reply({content: 'Du darfst diesen Befehl nicht nutzen!', ephemeral: true})
        const ticketUser = interaction.guild!.members.cache.find(member => member.user.username == (interaction.channel as TextChannel).name.split('-')[1])
        if(!ticketUser) return interaction.reply({content: 'Der User, der das Ticket erstellt hat, konnte nicht gefunden werden!', ephemeral: true});

        if((interaction.channel as TextChannel).parentId != Categories.ticket) return interaction.reply({content: 'Dies ist kein Ticket Kanal!', ephemeral: true})

        const embed = new EmbedBuilder({
            title: 'Schließ-Anfrage',
            description: `${interaction.member} hat das Schließen dieses Tickets angefordert! Grund:\n\`\`\`\n${interaction.options.getString('reason', true)}\n\`\`\`\nBitte akzeptiere oder verweigere mit den unten stehenden Buttons!`,
            color: Colors.Green
        })

        const row = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({
                    label: 'Akzeptieren und schließen',
                    style: 3,
                    emoji: '☑️',
                    customId: 'cr_accept'
                }),
                new ButtonBuilder({
                    label: 'Ablehnen & offen lassen',
                    style: 2,
                    emoji: '❌',
                    customId: 'cr_decline'
                })
            ]
        })

        await interaction.reply({content: `${ticketUser}`, embeds: [embed], components: [row]})
    }
}

export default command