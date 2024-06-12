import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, GuildMember, Guild, EmbedBuilder, Colors } from 'discord.js'
import { MemberManager } from '../../contents'
import { SlashCommand } from 'contents'

const command: SlashCommand ={
    data: new SlashCommandBuilder()
        .setName('perms')
        .setDescription('Gibt die Berechtigungen eines Mitglieds wieder')
        .addUserOption(input => input.setName('user').setDescription('Welcher User?').setRequired(true))
        .addStringOption(input => input.setName('search').setDescription('Suche nach einer Berechtigung'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: ChatInputCommandInteraction, client) {
        const user = interaction.options.getMember('user') as GuildMember
        const guild = client.guild
        const search = interaction.options.getString('search', false)

        const Member = new MemberManager(user, guild)

        const perms = Member.getPermissions()

        const embed = new EmbedBuilder({
            title: `Berechtigungen von ${user.user.username}`,
            description: `\`${perms.join('\`, \`')}\``,
            color: Colors.Gold,
            thumbnail: {url: Member.getAvatarUrl() || ''}
        })

        if(search) {
            const values = perms.filter(p => p.toLowerCase().includes(search.toLowerCase()))
            embed.data.title += ` mit '${search.toLowerCase()}'`
            if(values.length < 1) {
                embed.data.description = '```\nKeine Berechtigungen mit diesem Tag\n```'
            } else {
                embed.data.description = `\`${values.join('\`, \`')}\``
            }
        }

        await interaction.reply({embeds: [embed]})
    }
}
export default command