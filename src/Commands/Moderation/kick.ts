import { SlashCommandBuilder, PermissionFlagsBits, GuildMember, Guild } from "discord.js";
import { MemberManager, MyClient } from "contents";
import { SlashCommand } from 'dcbot'

/**
 * Befehl zum Kicken eines Users
 */
export default new SlashCommand({
    /**
     * Daten für den Befehl
     */
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicke einen User')
        .addUserOption(input => input.setName('user').setDescription('Welcher User?').setRequired(true))
        .addStringOption(input => input.setName('reason').setDescription('Grund für den Kick').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    /**
     * Funktion, die ausgeführt wird, wenn der Befehl aufgerufen wird
     * @param interaction Interaktion mit dem Nutzer
     * @param client Client-Objekt
     */
    async execute(interaction, client) {
        // Hole den zu kickenden Member
        const member = interaction.options.getMember('user') as GuildMember
        // Hole die Guild, in der der Befehl aufgerufen wurde
        const guild = interaction.guild as Guild
        // Hole den Grund für den Kick
        const reason = interaction.options.getString('reason', true)
        // Hole den Member, der den Befehl aufgerufen hat
        const mod = interaction.member as GuildMember

        // Überprüfe, ob der zu kickende Member eine höhere oder gleich hohe Rolle hat wie der ausführende Member
        if (member.roles.highest.position >= mod.roles.highest.position) {
            // Wenn ja, sende eine Fehlermeldung
            interaction.reply({ content: 'Du kannst diesen User nicht kicken, weil seine höchste Rolle höher oder gleich deiner höchsten Rolle ist', ephemeral: true })
            return
        }

        // Erstelle ein neues MemberManager-Objekt für den zu kickenden Member
        const Member = new MemberManager(member, guild)

        // Führe den Kick aus
        const kick = await Member.kick(mod, reason)
        // Überprüfe, ob der Kick erfolgreich war
        if (!kick) {
            // Wenn nicht, sende eine Fehlermeldung
            interaction.reply({ content: 'Etwas ist schiefgelaufen', ephemeral: true });
            return
        }
        else {
            // Wenn ja, sende eine Erfolgsmeldung
            interaction.reply({ content: `Du hast ${member.user.username} erfolgreich gekickt`, ephemeral: true })
            return
        }
    }
})
