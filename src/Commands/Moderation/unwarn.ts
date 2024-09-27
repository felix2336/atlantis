import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, GuildMember } from 'discord.js'
import { SlashCommand } from 'dcbot'
import Warns from '../../Schemas/warns'

export default new SlashCommand({
    // Definition des Befehls
    data: new SlashCommandBuilder()
        .setName('unwarn')
        .setDescription('Entferne einen Warn von einem User')
        .addUserOption(input => input.setName('user').setDescription('Der User, von dem du einen Warn entfernen möchtest').setRequired(true))
        .addStringOption(input => input.setName('warn-id').setDescription('Die ID des Warns, den du entfernen möchtest').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    // Ausführung des Befehls
    async execute(interaction) {
        // Abrufen des ausgewählten Mitglieds
        const member = interaction.options.getMember('user') as GuildMember
        // Abrufen der Warn-ID
        const id = interaction.options.get('warn-id', true).value as string

        // Abrufen der Warns des Mitglieds aus der Datenbank
        await Warns.findOne({ userId: member.user.id })
            .then(async User => {
                // Überprüfen, ob das Mitglied Warns hat oder ob die Warn-ID existiert
                if (!User || User.warns.length == 0 || !User.warns.find(w => w.id == id)) {
                    // Wenn nicht, senden einer Fehlermeldung
                    interaction.reply({ content: `${member} hat keine Verwarnungen oder keine mit dieser ID!`, ephemeral: true })
                    return
                } else {
                    // Entfernen der Warn aus der Datenbank
                    User.warns = User.warns.filter(w => w.id != id)
                    await User.save()
                    // Senden einer Erfolgsmeldung
                    interaction.reply(`Du hast einen Warn von ${member} entfernt!`)
                }
            })
    }
})
