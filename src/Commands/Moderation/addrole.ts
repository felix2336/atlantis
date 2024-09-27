import { SlashCommandBuilder, Role, GuildMember, PermissionFlagsBits } from 'discord.js'
import { MemberManager, MyClient } from 'contents'
import { SlashCommand } from 'dcbot'

export default new SlashCommand<MyClient>({
    // Definition der SlashCommand-Daten
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Gib einem User eine Rolle')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(input => input.setName('user').setDescription('Welcher User?').setRequired(true))
        .addRoleOption(input => input.setName('role').setDescription('Welche Rolle?').setRequired(true)),

    // Ausführung der SlashCommand-Funktion
    async execute(interaction, client) {
        // Abrufen der benötigten Informationen
        const user = interaction.options.getMember('user') as GuildMember
        const member = interaction.member as GuildMember
        const role = interaction.options.getRole('role', true) as Role
        const guild = client.guild!

        // Überprüfung, ob der ausführende User die Rolle vergeben darf
        if (member.roles.highest.position <= role.position) {
            interaction.reply({ content: 'Du darfst diese Rolle nicht vergeben!', ephemeral: true });
            return
        }
        // Überprüfung, ob der Bot die Rolle vergeben darf
        if (guild.members.me!.roles.highest.position <= role.position) {
            interaction.reply({ content: 'Der Bot darf die Rolle nicht vergeben!', ephemeral: true });
            return
        }
        // Überprüfung, ob der User die Rolle bereits hat
        if (user.roles.cache.has(role.id)) {
            interaction.reply({ content: 'Der User hat die Rolle schon', ephemeral: true })
            return
        }

        // Erstellen eines MemberManagers für den User
        const manager = new MemberManager(user, guild)
        // Hinzufügen der Rolle zum User
        await manager.addRole(role)
            .catch(e => {
                // Fehlermeldung bei fehlgeschlagener Rolle-Hinzufügung
                return interaction.reply({ content: e.message, ephemeral: true })
            })
        // Erfolgsmeldung bei erfolgreicher Rolle-Hinzufügung
        interaction.reply({ content: `Du hast ${user} erfolgreich folgende Rolle gegeben: ${role}`, ephemeral: true })
    }
})
