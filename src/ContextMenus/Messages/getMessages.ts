import { ContextMenuCommandBuilder, UserContextMenuCommandInteraction, ApplicationCommandType, PermissionFlagsBits, GuildMember, CacheType, EmbedBuilder, Colors } from 'discord.js'
import { UserContextMenu } from 'dcbot'
import Messages from '../../Schemas/messages'

export default new UserContextMenu({
    // Definiert die Daten für den Context-Menü-Befehl
    data: new ContextMenuCommandBuilder()
        .setName('Weekly Messages')
        .setType(ApplicationCommandType.User),

    // Funktion, die aufgerufen wird, wenn der Befehl ausgeführt wird
    async execute(interaction) {
        // Holt den Member, der den Befehl ausführt
        const member = interaction.member as GuildMember;
        // Holt den Ziel-Member, auf den der Befehl angewendet wird
        const target = interaction.targetMember as GuildMember

        // Überprüft, ob der Member die erforderliche Rolle hat
        if (!member.roles.cache.has('1156298949301379212')) {
            // Wenn nicht, sendet eine Fehlermeldung und beendet die Funktion
            interaction.reply({ content: 'Du bist nicht im Serverteam und darfst diesen Befehl nicht nutzen', ephemeral: true })
            return
        }

        // Holt die Daten des Ziel-Members aus der Datenbank
        const DBuser = await Messages.findOne({ userId: target.user.id })

        // Wenn keine Daten gefunden wurden, sendet eine entsprechende Meldung
        if (!DBuser) {
            const embed = new EmbedBuilder({
                title: 'Keine Nachrichten gefunden',
                description: 'Der User hat keine Nachrichten gesendet',
                color: 0x00ff00
            })
            await interaction.reply({ embeds: [embed] })
            return;
        }

        // Erstellt eine Embed-Meldung mit den gesendeten Nachrichten des Ziel-Members
        const embed = new EmbedBuilder({
            title: 'Gesendete Nachrichten',
            description: `${target} hat bereits ${DBuser.messagesSent} nachrichten gesendet`,
            color: Colors.Gold
        })

        // Sendet die Embed-Meldung
        await interaction.reply({ embeds: [embed] })
    },
})
