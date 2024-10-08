import { SlashCommandBuilder, Role, GuildMember, PermissionFlagsBits } from 'discord.js'
import { MemberManager, MyClient } from 'contents'
import { SlashCommand } from 'dcbot'

export default new SlashCommand<MyClient>({
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Gib einem User eine Rolle')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(input => input.setName('user').setDescription('Welcher User?').setRequired(true))
        .addRoleOption(input => input.setName('role').setDescription('Welche Rolle?').setRequired(true)),

    async execute(interaction, client) {
        const user = interaction.options.getMember('user') as GuildMember
        const member = interaction.member as GuildMember
        const role = interaction.options.getRole('role', true) as Role
        const guild = client.guild!

        if (member.roles.highest.position <= role.position) {
            interaction.reply({ content: 'Du darfst diese Rolle nicht vergeben!', ephemeral: true });
            return
        }
        if (guild.members.me!.roles.highest.position <= role.position){
            interaction.reply({ content: 'Der Bot darf die Rolle nicht vergeben!', ephemeral: true });
            return
        } 
        if (user.roles.cache.has(role.id)) {
            interaction.reply({ content: 'Der User hat die Rolle schon', ephemeral: true })
            return
        }

        const manager = new MemberManager(user, guild)
        await manager.addRole(role)
            .catch(e => {
                return interaction.reply({ content: e.message, ephemeral: true })
            })
        interaction.reply({ content: `Du hast ${user} erfolgreich folgende Rolle gegeben: ${role}`, ephemeral: true })
    }
})