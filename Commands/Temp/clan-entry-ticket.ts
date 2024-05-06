import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, ComponentType, TextChannel } from 'discord.js'
import { Channels } from '../../contents'

export default {
    data: new SlashCommandBuilder()
        .setName('clan-ticket-update')
        .setDescription('Temp command')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: ChatInputCommandInteraction){
        const channel = interaction.guild!.channels.cache.get(Channels.clan_ticket) as TextChannel
        const message = await channel.messages.fetch('1232420615579762821')
        const embed = new EmbedBuilder({
            title: 'Mitglied werden',
            description: 'Wenn du einem Clan beitreten möchtest, klicke bitte auf den Button!',
            color: Colors.DarkGreen
        })

        const button = new ButtonBuilder({
            customId: 'clan-ticket',
            style: ButtonStyle.Secondary,
            label: 'Ticket erstellen',
            emoji: '📩',
            // disabled: true
        })

        const row = new ActionRowBuilder().addComponents(button)
        //@ts-ignore
        await message.edit({embeds: [embed], components: [row]})
        interaction.reply({content: 'Das embed wurde aktualisiert', ephemeral: true})
    }
}