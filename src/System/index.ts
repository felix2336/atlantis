import { GatewayIntentBits, Partials } from 'discord.js'
import fs from 'fs'
import { MyClient } from 'contents';

// Erstelle eine neue Instanz des MyClient mit den benötigten Intents und Partials
const client = new MyClient({
    // Intents definieren, welche Ereignisse der Bot empfangen soll
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildPresences,
    ],
    // Partials definieren, welche Teile von Discord-Objekten geladen werden sollen
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.ThreadMember,
        Partials.Reaction,
        Partials.User,
        Partials.GuildScheduledEvent,
    ],
}, '773072144304963624');

// Lade die Konfiguration aus der config.json-Datei
const config = await import('./config.json');

// Lade die Befehle aus dem src/Commands-Verzeichnis
const commandFolders = fs.readdirSync('src/Commands').filter(folder => folder != 'Music')
for (const folder of commandFolders) {
    await client.loadCommands(`src/Commands/${folder}`)
}

// Lade die Ereignisse aus dem src/Events-Verzeichnis
const eventFolders = fs.readdirSync('src/Events')
for (const folder of eventFolders) {
    await client.loadEvents(`src/Events/${folder}`)
}

// Lade die Modale aus dem src/Modals-Verzeichnis
const modalFolders = fs.readdirSync('src/Modals')
for (const folder of modalFolders) {
    await client.loadModals(`src/Modals/${folder}`)
}

// Lade die String-Select-Menüs aus dem src/SelectMenus/Ticket-Verzeichnis
await client.loadStringSelectMenus('src/SelectMenus/Ticket')

// Lade die Message-Context-Menüs aus dem src/ContextMenus/Messages-Verzeichnis
await client.loadMessageContextMenus('src/ContextMenus/Messages')
// Lade die User-Context-Menüs aus dem src/ContextMenus/Warns-Verzeichnis
await client.loadUserContextMenus('src/ContextMenus/Warns')

// Lade die Buttons aus dem src/Buttons-Verzeichnis
fs.readdirSync('src/Buttons').forEach((folder) => {
    client.loadButtons(`src/Buttons/${folder}`);
});

// Protokolliere, wenn der Bot bereit ist
client.logWhenReady()
// Aktiviere die DM-Protokollierung in den Channel mit der ID 1250477524832489564
client.enableDmLog('1250477524832489564')
// Aktiviere die Interaktionen
client.handleInteractions()
// Melde den Bot bei Discord an
await client.login(config.token)
// Deploye die Befehle für die Guild mit der ID 1146113684435898439
client.deployCommands('1146113684435898439')

// Setze die Guild für den Bot auf die Guild mit der ID 1146113684435898439, wenn der Bot bereit ist
client.on('ready', async () => {
    client.setGuild(client.guilds.cache.get('1146113684435898439')!)
})

// client.on('ready', () => {
// client.user!.setPresence({
// status: 'invisible'
// })
// })

// client.on('error', (err) => {
//     client.logger.error(err.message)
// })

// process.on('uncaughtException', (err) => {
//     client.logger.error(err.message)
// })

// Exportiere den Client
export default client;
