import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js'
import fs from 'fs'
import { ConsoleInfo, ConsoleWarning, importSelectMenus, importCommands, importButtons, importModals, importMenus } from '../contents';

const client = new Client({
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
const [commands, apps] = await importCommands()
const [menus, finalApps] = await importMenus(apps);
const buttons = await importButtons();
const modals = await importModals();
const selectMenus = await importSelectMenus();

await importEvents()

client.on("interactionCreate", async interaction => {
    switch (true) {
        case interaction.isContextMenuCommand():
            const menu = menus.get(interaction.commandName);
            if(!menu) return interaction.reply({content: "Menu not found", ephemeral: true})
            menu.execute(interaction, client)
            break;

        case interaction.isChatInputCommand():
            const command = commands.get(interaction.commandName)
            if (!command) return interaction.reply({ content: "Command not found", ephemeral: true });
            command.execute(interaction, client)
            break;

        case interaction.isButton():
            const button = buttons.get(interaction.customId)
            if(!button) return interaction.reply({content: 'Button not found', ephemeral: true})
            button.execute(interaction, client)
            break;

        case interaction.isModalSubmit():
            const modal = modals.get(interaction.customId)
            if(!modal) return interaction.reply({content: 'MOdal not found', ephemeral: true})
            modal.execute(interaction, client)
            break;

        case interaction.isStringSelectMenu():
            const selectMenu = selectMenus.get(interaction.customId)
            if(!selectMenu) return interaction.reply({content: 'SelectMenu not found', ephemeral: true})
            selectMenu.execute(interaction, client)
            break;
    }
})

client.on('ready', () => {
    client.guilds.cache.forEach(g => {
        g.commands.set(finalApps.map((c) => c.data))
    })
})

client.setMaxListeners(0)
client.login(config.token)

async function importEvents() {
    const subDirs = fs.readdirSync('./Events')
    for (const dir of subDirs) {
        const files = fs.readdirSync(`./Events/${dir}`)
        for (const file of files) {
            const module = await import(`../Events/${dir}/${file}`)
            const event = module.default
            if (!event || !event.name) {
                new ConsoleWarning().show(`Fehler bei Event in Events/${dir}/${file}`)
                continue
            }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client))
            } else {
                client.on(event.name, (...args) => event.execute(...args, client))
            }


            new ConsoleInfo().show(`${event.name}-Event "${file.split('.')[0]}" geladen`)
        }
    }
}

export default client;