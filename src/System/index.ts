import { Collection, GatewayIntentBits, Partials } from 'discord.js'
import fs from 'fs'
import {MyClient } from 'contents';
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

await client.loadCommands('src/Commands/Admin')
// await client.loadCommands('Commands/Casino')
await client.loadCommands('src/Commands/General')
await client.loadCommands('src/Commands/Moderation')
await client.loadCommands('src/Commands/Music')
await client.loadCommands('src/Commands/Staff')
await client.loadCommands('src/Commands/Ticket')

await client.loadEvents('src/Events/Admin')
await client.loadEvents('src/Events/Client')
await client.loadEvents('src/Events/Database')
await client.loadEvents('src/Events/General')
await client.loadEvents('src/Events/messageCounter')
await client.loadEvents('src/Events/Observer')
await client.loadEvents('src/Events/Security')
await client.loadEvents('src/Events/Ticket')

await client.loadModals('src/Modals/Abmeldung')
await client.loadModals('src/Modals/Admin')
await client.loadModals('src/Modals/CustomEmbed')
await client.loadModals('src/Modals/General')
await client.loadModals('src/Modals/Security')
await client.loadModals('src/Modals/Staff')
await client.loadModals('src/Modals/Ticket')

await client.loadStringSelectMenus('src/SelectMenus/Ticket')

await client.loadUserContextMenus('src/ContextMenus/Messages')
await client.loadUserContextMenus('src/ContextMenus/Warns')

await client.loadButtons('src/Buttons/Abmeldung')
await client.loadButtons('src/Buttons/Admin')
await client.loadButtons('src/Buttons/CustomEmbed')
await client.loadButtons('src/Buttons/General')
await client.loadButtons('src/Buttons/Security')
await client.loadButtons('src/Buttons/Selfrole')
await client.loadButtons('src/Buttons/ticket')

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

client.on('error', (err: Error) => {
    client.logger.error(err.name)
})

process.on('uncaughtException', (err) => {
    client.logger.error(err.name)
})

export default client;