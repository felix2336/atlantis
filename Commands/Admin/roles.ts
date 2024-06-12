import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Guild, GuildMember, EmbedBuilder, Colors } from 'discord.js'
import { MemberManager } from '../../contents'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Gibt die Rollen eines MItglieds wieder')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(input => input.setName('user').setDescription('Welcher User?').setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getMember('user') as GuildMember
        const guild = interaction.guild as Guild

        const Member = new MemberManager(user, guild)

        const roles = Member.getRoles()
        const embed = new EmbedBuilder({
            title: `${user.user.username} hat die folgenden Rollen:`,
            description: `${roles.join('\n')}`,
            color: Colors.Gold,
            thumbnail: {url: Member.getAvatarUrl() || ''}
        })
        interaction.reply({embeds: [embed]})
    }
}
export default command