import { GuildMember, Client, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, TextChannel, AttachmentBuilder } from 'discord.js'
import { Channels } from 'contents'
import { profileImage } from 'discord-arts'
import { Event } from 'dcbot'

// Erstelle ein neues Event für den guildMemberAdd
export default new Event({
    // Name des Events
    name: 'guildMemberAdd',

    // Funktion, die ausgeführt wird, wenn das Event aufgerufen wird
    async execute(client, member: GuildMember) {
        // Hole den Welcome-Channel aus der Channel-Liste
        const channel = member.guild.channels.cache.get(Channels.welcome) as TextChannel

        // Erstelle ein Bild für den neuen Member mit Discord-Arts
        const buffer = await profileImage(member.user.id, {
            // Anzeige des aktuellen Datums im russischen Format
            customDate: new Date().toLocaleDateString('ru'),
            // Anzeige der Badges im Bild
            badgesFrame: true,
            // Anzeige des Willkommens-Textes
            customTag: 'Willkommen',
            // Anzeige des Status des Members
            presenceStatus: member.presence?.status,
        }).catch(console.log)

        // Erstelle ein Embed für die Willkommensnachricht
        const embed = new EmbedBuilder({
            // Titel des Embeds
            title: "Willkommen",
            // Beschreibung des Embeds
            description: `Hallo ${member} und ein herzliches Willkommen auf unserem Server! 👋\nWir freuen uns, dass du unserer Community beitreten bist ❤️\n\n🤝 Falls du Lust hast, kannst du dich in <#1182194022010322975> unserer Community vorstellen - teile uns gerne etwas über dich, deine Interessen und was dich hierhin führt mit.\n\n📜 Bevor du loslegen kannst, nimm dir bitte einen Moment Zeit, um unsere Serverregeln durchzulesen. Wir möchten, dass jeder hier eine tolle Zeit hat, und die Einhaltung der Richtlinien trägt dazu bei, ein positives Umfeld für alle zu schaffen.\n\nWir freuen uns dass du unserem Server beigetreten bist. 🎉\n\nWir sind jetzt ${member.guild.members.cache.size} Mitglieder**\n\nMit freundlichen Grüßen:\n**Das Server-Team**`,
            // Farbe des Embeds
            color: Colors.DarkGrey,
            // Felder des Embeds
            fields: [
                {
                    // Name des Feldes
                    name: "Wichtige Channel",
                    // Wert des Feldes
                    value: "- Unsere Regeln in <#1146113685962625128> \n- Selfroles in <#1148123116590071828> \n- Support in <#1153007107688386752>",
                }
            ]
        })

        // Erstelle eine Reihe mit einem Button
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
            // Button zum Begrüßen des neuen Members
            new ButtonBuilder({
                // Label des Buttons
                label: 'Mitglied begrüßen',
                // Custom-ID des Buttons
                customId: 'greet',
                // Stil des Buttons
                style: 2
            })
        ])

        // Überprüfe, ob das Bild erfolgreich erstellt wurde
        if (buffer instanceof Buffer) {
            // Erstelle eine Anlage für das Bild
            const attachment = new AttachmentBuilder(buffer, { name: 'image.png' })
            // Setze das Bild als Bild des Embeds
            embed.setImage('attachment://image.png')
            // Sende die Willkommensnachricht mit Bild und Button
            await channel.send({ content: `${member}`, embeds: [embed], components: [row], files: [attachment] })
        } else {
            // Sende die Willkommensnachricht ohne Bild
            await channel.send({ content: `${member}`, embeds: [embed], components: [row] })
        }
    }
})
