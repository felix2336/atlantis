import { Events, EmbedBuilder, TextChannel } from 'discord.js'
import { Giveaway, Channels, MyClient } from "contents";
import { readFileSync, writeFileSync } from 'fs'
import { Event } from 'dcbot';

export default new Event<MyClient>({
    name: Events.ClientReady,

    async execute(client) {
        // Hole den Test-Channel aus der Channel-Liste
        const channel = client.channels.cache.get(Channels.test) as TextChannel

        // Funktion zum Überprüfen der Verlosungen
        async function check() {
            // Aktuelle Zeit in Millisekunden
            const now = Date.now()

            // Lese die Verlosungen aus der JSON-Datei
            let giveaways = JSON.parse(readFileSync('./JSON/giveaways.json', 'utf8')) as Giveaway[]

            // Durchlaufe alle Verlosungen
            for (const giveaway of giveaways) {
                // Überprüfe, ob die Verlosung abgelaufen ist
                if (now > giveaway.endTime) {
                    // Wähle einen Gewinner aus den Teilnehmern aus
                    const winner = giveaway.participants[Math.floor(Math.random() * giveaway.participants.length)]

                    // Hole die Nachricht der Verlosung
                    const message = await channel.messages.fetch(giveaway.messageId)

                    // Erstelle ein neues Embed aus der Nachricht
                    const embed = EmbedBuilder.from(message.embeds[0])

                    // Ändere den Namen und Wert des zweiten Feldes im Embed
                    embed.data.fields![1].name = 'Gewinner'
                    embed.data.fields![1].value = `<@${winner}>`

                    // Bearbeite die Nachricht mit dem neuen Embed und entferne die Komponenten
                    await message.edit({ embeds: [embed], components: [] })

                    // Sende eine Nachricht mit dem Gewinner
                    await message.reply({ content: `🎉 **»** Herzlichen Glückwunsch <@${winner}>! Du hast **${giveaway.prize}** gewonnen!` })

                    // Entferne die Verlosung aus der Liste
                    giveaways = giveaways.filter(g => g.messageId != giveaway.messageId)

                    // Speichere die aktualisierte Liste in die JSON-Datei
                    writeFileSync('./JSON/giveaways.json', JSON.stringify(giveaways, null, 2), 'utf8')
                }
            }
        }

        // Führe die Überprüfung aus und fange Fehler ab
        await check().catch(client.logger.error)

        // Führe die Überprüfung alle 60 Sekunden aus
        setInterval(check, 60000)
    }
})
