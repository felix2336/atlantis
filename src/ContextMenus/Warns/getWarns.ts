import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, PermissionFlagsBits, GuildMember, EmbedBuilder, Colors } from "discord.js";
import { UserContextMenu } from "dcbot";
import Warns from "../../Schemas/warns";

export default new UserContextMenu({
    // Daten für den Context-Menü-Befehl
    data: new ContextMenuCommandBuilder()
        .setName('Warns') // Name des Befehls
        .setType(ApplicationCommandType.User), // Typ des Befehls (hier: Benutzer)

    // Funktion, die ausgeführt wird, wenn der Befehl verwendet wird
    async execute(interaction) {
        // Abrufen des Mitglieds, auf das der Befehl angewendet wird
        const member = interaction.options.getMember('user') as GuildMember

        // Abrufen der Verwarnungen des Mitglieds aus der Datenbank
        await Warns.findOne({ userId: member.user.id })
            .then(async User => {
                // Wenn das Mitglied keine Verwarnungen hat, wird eine entsprechende Nachricht gesendet
                if (!User || User.warns.length == 0) {
                    interaction.reply({ content: `${member} hat keine Verwarnungen!`, ephemeral: true })
                } else {
                    // Erstellen eines Embeds, um die Verwarnungen anzuzeigen
                    const embed = new EmbedBuilder({
                        title: `Warns von ${member.displayName}`,
                        description: '',
                        color: Colors.Gold
                    })

                    // Hinzufügen der Verwarnungen zum Embed
                    for (const warn of User.warns) {
                        embed.data.description += `${warn.date} von ${warn.moderator}\nGrund: **${warn.reason}**\nWarn-ID: \`${warn.id}\`\n\n`
                    }

                    // Senden des Embeds als Antwort auf die Interaktion
                    interaction.reply({ embeds: [embed] })
                    return
                }
            })
            // Fehlerbehandlung
            .catch(console.log)
    }
})
