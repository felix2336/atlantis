import { Event } from 'dcbot'
import Croner from 'croner'
import { DateTime } from 'luxon'
import Birthdays from '../../Schemas/birthdays'
import { EmbedBuilder, TextChannel } from 'discord.js'
import { Channels } from 'contents'

/**
 * Ereignis, das ausgeführt wird, wenn der Bot bereit ist.
 */
export default new Event({
    name: 'ready',

    /**
     * Funktion, die ausgeführt wird, wenn das Ereignis eintritt.
     * @param client Der Client, der das Ereignis ausgelöst hat.
     */
    async execute(client) {
        // Kanal, in dem die Geburtstagsnachrichten gesendet werden sollen.
        const channel = client.channels.cache.get(Channels.birthdays) as TextChannel

        // Cron-Job, der jeden Tag um 8 Uhr ausgeführt wird.
        new Croner('0 8 * * *', async () => {
            // Aktuelles Datum und Monat.
            const { day, month } = DateTime.now();
            // Suche nach Geburtstagen, die heute sind.
            const birthdays = await Birthdays.find({ day, month });
            // Wenn keine Geburtstage gefunden wurden, breche ab.
            if (!birthdays.length) return;

            // Liste der Benutzer, die heute Geburtstag haben.
            const users = birthdays.map(b => `<@${b.userId}>`);
            // Erstelle eine Embed-Nachricht für die Geburtstagsgrüße.
            const embed = new EmbedBuilder({
                title: '🎉 Herzlichen Glückwunsch 🎉',
                description: `${formatUsers(users)} ${users.length > 1 ? 'haben' : 'hat'} heute Geburtstag! 🥳🎂`,
                fields: [
                    { name: '🎁 Alles Gute!', value: `Wir wünschen ${users.length > 1 ? 'euch' : 'dir'} einen tollen Tag voller Freude und Überraschungen!` },
                    { name: '🎈 Feiert schön!', value: `Genießt ${users.length > 1 ? 'jeden' : 'jeden'} Augenblick dieses Tages und lasst ${users.length > 1 ? 'dich' : 'dich'} gebührend feiern!` }
                ]
            });

            // Sende die Geburtstagsnachricht im Kanal.
            await channel.send({ embeds: [embed] })
                // Reagiere auf die Nachricht mit einem 🥳-Emoji.
                .then(async msg => await msg.react('🥳'));
        });
    },
});

/**
 * Funktion, die eine Liste von Benutzern in eine formatierte Zeichenkette umwandelt.
 * @param users Liste von Benutzern.
 * @returns Formatierter String.
 */
function formatUsers(users: string[]): string {
    // Wenn es genau zwei Benutzer gibt, trenne sie mit "und".
    if (users.length === 2) return users.join(' und ');
    // Ansonsten trenne alle Benutzer außer dem letzten mit Kommas und füge den letzten Benutzer mit "und" hinzu.
    const lastUser = users.pop();
    return users.join(', ') + ' und ' + lastUser;
}
