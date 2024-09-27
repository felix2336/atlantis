import { Events, Message } from "discord.js";
import { Pings } from "contents";
import { MyClient } from 'contents'
import { Event } from "dcbot";
import Bumps from "../../Schemas/bumps";

export default new Event<MyClient>({
    // Ereignisname, auf das wir reagieren möchten
    name: Events.MessageCreate,

    // Funktion, die ausgeführt wird, wenn das Ereignis eintritt
    async execute(client, message: Message) {
        // Überprüfen, ob die Nachricht eine Interaktion enthält
        if (!message.interaction) return;
        // Überprüfen, ob die Interaktion das Bump-Kommando ist
        if (message.interaction.commandName != 'bump') return;

        // Benutzerdaten aus der Datenbank abrufen
        await Bumps.findOne({ userId: message.interaction.user.id })
            .then(async User => {
                // Wenn der Benutzer bereits in der Datenbank existiert, inkrementieren wir seinen Bump-Zähler
                if (User) {
                    User.bumps++
                    await User.save()
                }
                // Wenn der Benutzer nicht in der Datenbank existiert, erstellen wir einen neuen Eintrag
                else {
                    await Bumps.create({ userid: message.interaction!.user.id, bumps: 1 })
                }
            })
            // Fehlermeldung ausgeben, wenn ein Fehler auftritt
            .catch(console.log)

        // Benutzer für das Bumpen bedanken
        await message.channel.send({ content: `Vielen Dank fürs Bumpen ${message.interaction.user}!\nIch werde bescheid geben, wenn es wieder Zeit zum Bumpen ist.` })
        // Nach 2 Stunden eine Erinnerung senden, dass es wieder Zeit zum Bumpen ist
        setTimeout(async () => {
            await message.channel.send(`Hey ${Pings.bumping}! Es ist wieder Zeit mit </bump:947088344167366698> zu Bumpen!`)
        }, 7200000)

    }
})
