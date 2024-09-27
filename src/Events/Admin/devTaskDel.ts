import { Message, Events } from 'discord.js';
import { Event } from 'dcbot';

// Ereignis für die Erstellung einer Nachricht
export default new Event({
    // Name des Ereignisses
    name: Events.MessageCreate,

    // Funktion, die ausgeführt wird, wenn das Ereignis eintritt
    async execute(client, message: Message) {
        // Überprüfe, ob die Nachricht im richtigen Kanal erstellt wurde
        if (message.channelId != '1200374840696246302') return

        // Überprüfe, ob die Nachricht einen Embed enthält
        if (message.embeds.length != 0) return;

        // Warte 5 Sekunden, bevor die Nachricht bearbeitet wird
        setTimeout(async () => {
            // Hole die Nachricht aus dem Kanal
            const msg = await message.channel.messages.fetch(message.id);

            // Überprüfe, ob die Nachricht existiert
            if (!msg) return;

            // Überprüfe, ob die Nachricht nicht festgepinnt ist und gelöscht werden kann
            else if (msg && !msg.pinned && msg.deletable) {
                // Lösche die Nachricht
                await msg.delete().catch(err => {
                    // Protokolliere Fehler
                    console.log(err)
                })
            } else {
                // Reagiere auf die Nachricht, wenn sie nicht gelöscht werden kann
                await msg.react(':name_badge:')
                return
            }
        }, 5000)
    }
})