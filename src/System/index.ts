import { Collection, GatewayIntentBits, Partials } from 'discord.js'
import fs from 'fs'
import { MyClient } from 'contents';
import ytdl from 'ytdl-core-discord';
import { createAudioResource } from '@discordjs/voice';

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
});

const config = await import('./config.json');

fs.readdirSync('src/Commands').forEach((folder) => {
    client.loadCommands(`src/Commands/${folder}`);
});


fs.readdirSync('src/Events').forEach((folder) => {
    client.loadEvents(`src/Events/${folder}`);
});


fs.readdirSync('src/Modals').forEach((folder) => {
    client.loadModals(`src/Modals/${folder}`);
});


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
    client.enableAudioPlayer()
    client.player?.on('stateChange', async (oldState, newState) => {
        if (newState.status != 'idle') return
        client.queue.shift()

        if (client.queue.length > 0) {
            const nextStream = await ytdl(client.queue[0].url)
            const nextResource = createAudioResource(nextStream)
            client.player?.play(nextResource)
        } else {
            client.queue = []
        }
    })
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