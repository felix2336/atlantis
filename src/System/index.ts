import { Collection, GatewayIntentBits, Partials } from 'discord.js'
import fs from 'fs'
import { MyClient } from 'contents';
import ytdl from 'ytdl-core-discord';
import { createAudioResource } from '@discordjs/voice';
import { CommandStartedEvent } from 'mongodb';

const client = new MyClient({
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

const config = await import('./config.json');

const commandFolders = fs.readdirSync('src/Commands').filter(folder => folder != 'Music')
for (const folder of commandFolders) {
    await client.loadCommands(`src/Commands/${folder}`)
}

const eventFolders = fs.readdirSync('src/Events')
for (const folder of eventFolders) {
    await client.loadEvents(`src/Events/${folder}`)
}

const modalFolders = fs.readdirSync('src/Modals')
for (const folder of modalFolders) {
    await client.loadModals(`src/Modals/${folder}`)
}

await client.loadStringSelectMenus('src/SelectMenus/Ticket')

await client.loadUserContextMenus('src/ContextMenus/Messages')
await client.loadUserContextMenus('src/ContextMenus/Warns')

fs.readdirSync('src/Buttons').forEach((folder) => {
    client.loadButtons(`src/Buttons/${folder}`);
});


client.logWhenReady()
client.enableDmLog('1250477524832489564')
client.handleInteractions()
await client.login(config.token)
client.deployCommands('1146113684435898439')

// await startServer()


client.on('ready', async () => {
    client.setGuild(client.guilds.cache.get('1146113684435898439')!)
})

// client.on('ready', () => {
// client.user!.setPresence({
// status: 'invisible'
// })
// })

// client.on('error', (err: Error) => {
//     client.logger.error(err.message)
// })

// process.on('uncaughtException', (err) => {
//     client.logger.error(err.message)
// })

export default client;