import { SlashCommandBuilder, PermissionFlagsBits, GuildMember, Guild } from "discord.js";
import { MemberManager } from "../../contents";
import { SlashCommand } from 'contents'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicke einen User')
        .addUserOption(input => input.setName('user').setDescription('Welcher User?').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Grund für den Kick').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction, client) {
        const member = interaction.options.getMember('user') as GuildMember
        const guild = interaction.guild as Guild
        const reason = interaction.options.getString('reason', true)
        const mod = interaction.member as GuildMember

        if(member.roles.highest.position >= mod.roles.highest.position) return interaction.reply({content: 'Du kannst diesen User nicht kicken, weil seine höchste Rolle höher oder gleich deiner höchsten Rolle ist', ephemeral: true})

        const Member = new MemberManager(member, guild)

        const kick = await Member.kick(mod, reason)
        if(!kick) return interaction.reply({content: 'Etwas ist schiefgelaufen', ephemeral: true});
        else return interaction.reply({content: `Du hast ${member.user.username} erfolgreich gekickt`, ephemeral: true})
    }
}
export default command