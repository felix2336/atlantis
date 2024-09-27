import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, GuildMember, Colors } from "discord.js";
import { SlashCommand } from "dcbot";
import Warns from '../../Schemas/warns'

export default new SlashCommand({
    // Definition des Slash-Befehls
    data: new SlashCommandBuilder()
        .setName('clearwarnings')
        .setDescription('Lösche alle Verwarnungen von einem User')
        .addUserOption(input => input.setName('user').setDescription('Welcher User?').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    // Ausführung des Befehls
    async execute(interaction, client) {
        // Zieluser aus den Optionen holen
        const target = interaction.options.getMember('user') as GuildMember

        // Warnungen des Zielusers aus der Datenbank holen
        await Warns.findOne({ userId: target.user.id })
            .then(async User => {
                // Wenn der User keine Warnungen hat, eine Nachricht senden
                if (!User || User.warns.length == 0) {
                    interaction.reply({ content: `${target} hat keine Verwarnungen!`, ephemeral: true })
                    return
                } else {
                    // Alle Warnungen des Users löschen
                    User.warns = []
                    await User.save()
                    // Erfolgsmeldung senden
                    interaction.reply({ content: `Du hast alle Verwarnungen von ${target} gelöscht!`, ephemeral: true })
                }
            })
            .catch(console.log)
    },
})
