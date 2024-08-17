import { SlashCommandBuilder, PermissionFlagsBits, GuildMember, Guild } from "discord.js";
import { MemberManager, MyClient } from "../../contents";
import { SlashCommand } from 'dcbot'

export default new SlashCommand( {
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

        if(member.roles.highest.position >= mod.roles.highest.position) {
            interaction.reply({content: 'Du kannst diesen User nicht kicken, weil seine höchste Rolle höher oder gleich deiner höchsten Rolle ist', ephemeral: true})
            return
        }

        const Member = new MemberManager(member, guild)

        const kick = await Member.kick(mod, reason)
        if(!kick) {
            interaction.reply({content: 'Etwas ist schiefgelaufen', ephemeral: true});
            return
        }
        else {
            interaction.reply({content: `Du hast ${member.user.username} erfolgreich gekickt`, ephemeral: true})
            return
        }
    }
})
