import { StringSelectMenuBuilder, CommandInteraction, SlashCommandBuilder, Colors, TextChannel, ActionRowBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js'
import { Channels } from '../../contents'

export default {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Sende das Ticket Embed in den Channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: CommandInteraction) {
        const channel = interaction.guild!.channels.cache.get(Channels.ticket) as TextChannel
        const select = new StringSelectMenuBuilder()
            .setCustomId('ticket')
            .setPlaceholder('Wähle ein Thema für ein Ticket...')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Bewerben')
                    .setDescription('Du möchtest dich bewerben?')
                    .setValue('bewerben'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Report')
                    .setDescription('Du möchtest einen User melden?')
                    .setValue('report'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Support')
                    .setDescription('Du brauchst hilfe?')
                    .setValue('support')
            )

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select)

        const embed = new EmbedBuilder({
            title: 'Willkommen im Support! Erstelle einfach ein Ticket',
            description: 'Bnötigst du Hilfe, möchtest du dich bewerben oder möchtest du ein Mitglied mellden?\nDann bist du hier genau richtig!\nErstelle einfach ein Ticket und beantworte die Fragen ehrlich\nUnser Serverteam steht bereit um dir zu helfen',
            color: Colors.Blue
        })
        
        await channel.send({embeds: [embed], components: [row]})
    }
}