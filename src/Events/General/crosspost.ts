import { Event } from 'dcbot';
import { Message, ChannelType } from 'discord.js';

/**
 * Ereignis, das ausgelöst wird, wenn eine Nachricht erstellt wird.
 */
export default new Event({
    /**
     * Name des Ereignisses.
     */
    name: 'messageCreate',

    /**
     * Funktion, die ausgeführt wird, wenn das Ereignis ausgelöst wird.
     * @param client Der Client, der das Ereignis ausgelöst hat.
     * @param message Die erstellte Nachricht.
     */
    async execute(client, message: Message) {
        // Überprüfe, ob die Nachricht in einem bestimmten Kanal erstellt wurde.
        if (message.channelId !== '1153922545834262550') return;

        try {
            // Versuche, die Nachricht zu crossposten.
            message.crosspost()
        } catch (err) {
            // Logge den Fehler, wenn die Crosspost-Funktion fehlschlägt.
            console.log(err)
        }
    }
})