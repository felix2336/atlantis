import { Collection, GatewayIntentBits, Partials } from 'discord.js'
import fs from 'fs'
import { Err, MyClient } from '../contents';
import ytdl from 'ytdl-core-discord';
import { createAudioResource } from '@discordjs/voice';
import startServer from '../Server/backend';

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

await client.loadCommands('Commands/Admin')
// await client.loadCommands('Commands/Casino')
await client.loadCommands('Commands/General')
await client.loadCommands('Commands/Moderation')
await client.loadCommands('Commands/Music')
await client.loadCommands('Commands/Staff')

await client.loadEvents('Events/Admin')
await client.loadEvents('Events/Client')
await client.loadEvents('Events/Database')
await client.loadEvents('Events/General')
await client.loadEvents('Events/messageCounter')
await client.loadEvents('Events/Observer')
await client.loadEvents('Events/Security')

await client.loadModals('Modals/Abmeldung')
await client.loadModals('Modals/Admin')
await client.loadModals('Modals/CustomEmbed')
await client.loadModals('Modals/General')
await client.loadModals('Modals/Security')
await client.loadModals('Modals/Staff')
await client.loadModals('Modals/Ticket')

await client.loadStringSelectMenus('SelectMenus/Ticket')

await client.loadUserContextMenus('ContextMenus/Messages')
await client.loadUserContextMenus('ContextMenus/Warns')

await client.loadButtons('Buttons/Abmeldung')
await client.loadButtons('Buttons/Admin')
await client.loadButtons('Buttons/CustomEmbed')
await client.loadButtons('Buttons/General')
await client.loadButtons('Buttons/Security')
await client.loadButtons('Buttons/Selfrole')
await client.loadButtons('Buttons/ticket')

client.logWhenReady()
client.enableDmLog('1250477524832489564')
client.handleInteractions()
client.login(config.token)
client.setMaxListeners(0)
client.deployCommands('1146113684435898439')

await startServer()


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

client.on('error', (err: Error) => {
    Err(err)
})

process.on('uncaughtException', (err) => {
    Err(err)
})

export default client;