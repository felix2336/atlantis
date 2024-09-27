import { ActionRowBuilder, ButtonBuilder, Colors, EmbedBuilder, Events, Message } from 'discord.js'
import { Roles, UnbanRequestButton } from 'contents'
import { Event } from 'dcbot'

export default new Event({
    // Ereignisname, das aufgerufen wird, wenn eine Nachricht erstellt wird
    name: Events.MessageCreate,

    // Funktion, die aufgerufen wird, wenn das Ereignis eintritt
    async execute(client, message: Message) {
        // Überprüfe, ob der Autor der Nachricht ein Bot ist
        if (message.author.bot) return;

        // Überprüfe, ob der Autor der Nachricht eine Staff-Rolle hat
        if (message.member?.roles.cache.has(Roles.staff)) return;

        // Hole den Inhalt der Nachricht
        const { content } = message

        // Überprüfe, ob der Autor der Nachricht keine Staff-Rolle hat und die Nachricht einen Discord-Invite und @everyone enthält
        if (!message.member?.roles.cache.has(Roles.staff) && content.includes('@everyone') && content.includes('discord.gg/')) {
            // Lösche die Nachricht
            await message.delete()

            // Banne den Autor der Nachricht
            await message.member?.ban({ deleteMessageSeconds: 3600, reason: "Sent discord invite and pinged everyone" }).catch(async err => {
                // Wenn das Bannen fehlschlägt, timeouten den Autor der Nachricht
                await message.member?.timeout(3600, 'Sent discord invite and pinged everyone')
            })

            // Erstelle eine Embed-Nachricht für den Autor der Nachricht
            const embed = new EmbedBuilder({
                title: 'Gebannt',
                description: 'Du wurdest automatisch gebannt, da du einen Invite geschickt hast und @everyone gepingt hast.\n\nDu kannst mit dem Button unten einen Entbannungsantrag stellen.',
                color: Colors.DarkRed,
                timestamp: new Date(),
                footer: { text: 'Sicherheitsbann' }
            })

            // Sende die Embed-Nachricht an den Autor der Nachricht
            await message.member!.send({ embeds: [embed], components: [new ActionRowBuilder<ButtonBuilder>().addComponents(UnbanRequestButton)] })
                .catch(err => {
                    // Protokolliere den Fehler, wenn die Nachricht nicht gesendet werden kann
                    console.log(err)
                })
        }
    }
})
