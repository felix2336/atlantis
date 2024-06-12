import { SlashCommandBuilder, ChatInputCommandInteraction, Role, GuildMember, Guild, Client, PermissionFlagsBits } from 'discord.js'
import { MemberManager } from '../../contents'
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Gib einem User eine Rolle')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(input => input.setName('user').setDescription('Welcher User?').setRequired(true))
        .addRoleOption(input => input.setName('role').setDescription('Welche Rolle?').setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction, client) {
        const user = interaction.options.getMember('user') as GuildMember
        const member = interaction.member as GuildMember
        const role = interaction.options.getRole('role', true) as Role
        const guild = client.guild

        if (member.roles.highest.position <= role.position) return interaction.reply({ content: 'Du darfst diese Rolle nicht vergeben!', ephemeral: true });
        if (guild.members.cache.get(client.user!.id)!.roles.highest.position <= role.position) return interaction.reply({ content: 'Der Bot darf die Rolle nicht vergeben!', ephemeral: true });
        if (user.roles.cache.has(role.id)) return interaction.reply({ content: 'Der User hat die Rolle schon', ephemeral: true })

        const manager = new MemberManager(user, guild)
        await manager.addRole(role)
            .catch(e => {
                return interaction.reply({ content: e.message, ephemeral: true })
            })
        interaction.reply({ content: `Du hast ${user} erfolgreich folgende Rolle gegeben: ${role}`, ephemeral: true })
    }
}
export default command