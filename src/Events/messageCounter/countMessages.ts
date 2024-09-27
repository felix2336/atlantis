import { Message, Events, ChannelType } from 'discord.js';
import Messages from '../../Schemas/messages'
import { Event } from 'dcbot';

export default new Event({
    // Ereignisname, das aufgerufen wird, wenn eine Nachricht erstellt wird
    name: Events.MessageCreate,

    // Funktion, die aufgerufen wird, wenn das Ereignis eintritt
    async execute(client, message: Message) {
        // Überprüfe, ob der Autor der Nachricht ein Bot ist
        if (message.author.bot) return;

        // Überprüfe, ob die Nachricht in einem Direktnachrichtenkanal gesendet wurde
        if (message.channel.type == ChannelType.DM) return;

        // Überprüfe, ob die Nachricht in einem bestimmten Kanal gesendet wurde
        if (message.channel.parentId == '1156996872657977394') return;
        if (message.channel.parentId == '1180678820085370940') return;

        // Suche nach einem Benutzer in der Datenbank
        const DBUser = await Messages.findOne({ userId: message.author.id })

        // Wenn der Benutzer nicht in der Datenbank gefunden wurde, erstelle einen neuen Eintrag
        if (!DBUser) {
            await Messages.create({
                userId: message.author.id,
                messagesSent: 1,
            })
        }
        // Wenn der Benutzer bereits in der Datenbank gefunden wurde, aktualisiere den Zähler für gesendete Nachrichten
        else {
            DBUser.messagesSent++
            await DBUser.save()
        }
    }
})
