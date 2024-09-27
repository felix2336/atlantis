import { Event } from 'dcbot'
import { Categories, Channels } from 'contents'
import { Attachment, Events, ForumChannel, Message, TextBasedChannel, TextChannel } from 'discord.js'

export default new Event({
    // Ereignisname, das aufgerufen wird, wenn eine Nachricht erstellt wird
    name: Events.MessageCreate,

    // Funktion, die aufgerufen wird, wenn das Ereignis eintritt
    async execute(client, message: Message) {
        // Prüfe, ob die Nachricht von einem Bot stammt und breche die Funktion ab, wenn ja
        if (message.author.bot) return;

        // Setze den Kanal auf den Kanal, in dem die Nachricht gesendet wurde
        const channel = message.channel as TextChannel;

        // Prüfe, ob der Kanal in der Kategorie "Tickets" liegt und breche die Funktion ab, wenn nein
        if (channel.parentId !== Categories.ticket) return;

        // Hole den Kanal für die Transkripte
        const transkripts = client.channels.cache.get(Channels.ticket_transkripts) as ForumChannel;

        // Hole den ersten Webhook im Transkript-Kanal
        const wh = (await transkripts.fetchWebhooks()).first();

        // Breche die Funktion ab, wenn kein Webhook gefunden wurde
        if (!wh) return;

        // Finde den Thread im Transkript-Kanal, der dem Namen des aktuellen Kanals entspricht
        const transkript = transkripts.threads.cache.find(ch => ch.name === channel.name);

        // Breche die Funktion ab, wenn kein Thread gefunden wurde
        if (!transkript) return;

        // Hole alle Anhänge der Nachricht
        const attachments = Array.from(message.attachments.values());

        // Sende die Nachricht über den Webhook
        await wh.send({
            // Anhänge der Nachricht
            files: attachments,
            // Inhalt der Nachricht
            content: message.content,
            // ID des Threads, in dem die Nachricht gesendet werden soll
            threadId: transkript.id,
            // Benutzername des Absenders
            username: message.author.username,
            // Avatar-URL des Absenders
            avatarURL: message.author.displayAvatarURL(),
        });
    },
})
