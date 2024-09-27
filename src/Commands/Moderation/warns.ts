import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, GuildMember, Colors } from 'discord.js'
import { SlashCommand } from 'dcbot'
import Warns from '../../Schemas/warns'

export default new SlashCommand({
    // Definition des Befehls
    data: new SlashCommandBuilder()
        .setName('warns')
        .setDescription('Lasse dir alle Warns von einem User anzeigen')
        .addUserOption(input => input.setName('user').setDescription('Der User, von dem du die Warns sehen möchtest').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    // Ausführung des Befehls
    async execute(interaction) {
        // Abrufen des ausgewählten Mitglieds
        const member = interaction.options.getMember('user') as GuildMember

        // Abrufen der Warns des Mitglieds aus der Datenbank
        await Warns.findOne({ userId: member.user.id })
            .then(async User => {
                // Überprüfen, ob das Mitglied Warns hat
                if (!User || User.warns.length == 0) {
                    // Wenn nicht, senden einer Nachricht, dass das Mitglied keine Warns hat
                    interaction.reply({ content: `${member} hat keine Verwarnungen!`, ephemeral: true })
                } else {
                    // Erstellen eines Embeds, um die Warns anzuzeigen
                    const embed = new EmbedBuilder({
                        title: `Warns von ${member.displayName}`,
                        description: '',
                        color: Colors.Gold
                    })

                    // Hinzufügen der Warns zum Embed
                    for (const warn of User.warns) {
                        embed.data.description += `${warn.date} von ${warn.moderator}\nGrund: **${warn.reason}**\nWarn-ID: \`${warn.id}\`\n\n`
                    }

                    // Senden des Embeds
                    interaction.reply({ embeds: [embed] })
                    return
                }
            })
            // Fehlerbehandlung
            .catch(console.log)
    }
})
