import { Collection, GatewayIntentBits, Partials } from 'discord.js'
import fs from 'fs'
import { MyClient, ConsoleInfo, ConsoleWarning, Err, importSelectMenus, importCommands, importButtons, importModals, importMenus, importEvents } from '../contents';
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
await importCommands(client)
await importMenus(client);
await importButtons(client);
await importModals(client);
await importSelectMenus(client);
await importEvents(client)
await client.login(config.token)
client.setMaxListeners(0)

client.on("interactionCreate", async interaction => {
    switch (true) {
        case interaction.isContextMenuCommand():
            const menu = client.contextMenus.get(interaction.commandName);
            if (!menu) return interaction.reply({ content: "Menu not found", ephemeral: true })
            menu.execute(interaction, client)
            break;

        case interaction.isChatInputCommand():
            const command = client.commands.get(interaction.commandName)
            if (!command) return interaction.reply({ content: "Command not found", ephemeral: true });
            command.execute(interaction, client)
            break;

        case interaction.isButton():
            const button = client.buttons.get(interaction.customId)
            if (!button) return interaction.reply({ content: 'Button not found', ephemeral: true })
            button.execute(interaction, client)
            break;

        case interaction.isModalSubmit():
            const modal = client.modals.get(interaction.customId)
            if (!modal) return interaction.reply({ content: 'MOdal not found', ephemeral: true })
            modal.execute(interaction, client)
            break;

        case interaction.isStringSelectMenu():
            const selectMenu = client.selectMenus.get(interaction.customId)
            if (!selectMenu) return interaction.reply({ content: 'SelectMenu not found', ephemeral: true })
            selectMenu.execute(interaction, client)
            break;
    }
})

client.on('ready', async () => {
    for (const [id, guild] of client.guilds.cache) {
        guild.commands.set(client.apps.map(c => c.data))
    }
    client.setGuild(client.guilds.cache.get('1146113684435898439')!)
    client.enableAudioPlayer()
    client.player.on('stateChange', async (oldState, newState) => {
        if (newState.status != 'idle') return
        client.queue.shift()

        if (client.queue.length > 0) {
            const nextStream = await ytdl(client.queue[0].url)
            const nextResource = createAudioResource(nextStream)
            client.player.play(nextResource)
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