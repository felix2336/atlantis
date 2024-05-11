import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js'
import fs from 'fs'
import chalk from 'chalk'
import { ConsoleInfo, ConsoleWarning } from '../contents';

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

const commands = new Collection<string, any>();
const buttons = new Collection<string, any>();
const modals = new Collection<string, any>();
const menus = new Collection<string, any>();
const selectMenus = new Collection<string, any>()
const apps: any[] = []

await importCommands()
await importButtons()
await importModals()
await importMenus()
await importEvents()
await importSelectMenus()

client.on("interactionCreate", async interaction => {
    switch (true) {
        case interaction.isContextMenuCommand():
            const menu = menus.get(interaction.commandName);
            menu.execute(interaction, client)
            break;

        case interaction.isChatInputCommand():
            const command = commands.get(interaction.commandName)
            command.execute(interaction, client)
            break;

        case interaction.isButton():
            const button = buttons.get(interaction.customId)
            button.execute(interaction, client)
            break;

        case interaction.isModalSubmit():
            const modal = modals.get(interaction.customId)
            modal.execute(interaction, client)
            break;

        case interaction.isStringSelectMenu():
            const selectMenu = selectMenus.get(interaction.customId)
            selectMenu.execute(interaction, client)
            break;
    }
})

client.on('ready', () => {
    client.guilds.cache.forEach(g => {
        g.commands.set(apps.map(a => a.data))
    })
})

client.setMaxListeners(0)
client.login(config.token)

async function importCommands() {
    const subDirs = fs.readdirSync('./Commands')
    for (const dir of subDirs) {
        const files = fs.readdirSync(`./Commands/${dir}`)
        for (const file of files) {
            const module = await import(`../Commands/${dir}/${file}`)
            const command = module.default
            if (!command || !command.data || !command.data.name || !command.data.description) {
                new ConsoleWarning().show(`Befehl in Commands/${dir}/${file} ist ungültig`)
                continue
            }

            commands.set(command.data.name, command)
            apps.push(command)
            new ConsoleInfo().show(`Befehl "/${command.data.name}" geladen`)
        }
    }
}

async function importButtons() {
    const subDirs = fs.readdirSync('./Buttons')
    for (const dir of subDirs) {
        const files = fs.readdirSync(`./Buttons/${dir}`)
        for (const file of files) {
            const module = await import(`../Buttons/${dir}/${file}`)
            const button = module.default
            if (!button || !button.id) {
                new ConsoleWarning().show(`Fehler bei Button in Buttons/${dir}/${file}`)
                continue
            }

            buttons.set(button.id, button)
            new ConsoleInfo().show(`Button "${button.id}" geladen`)
        }
    }
}

async function importModals() {
    const subDirs = fs.readdirSync('./Modals')
    for (const dir of subDirs) {
        const files = fs.readdirSync(`./Modals/${dir}`)
        for (const file of files) {
            const module = await import(`../Modals/${dir}/${file}`)
            const modal = module.default
            if (!modal || !modal.id) {
                new ConsoleWarning().show(`Fehler bei Modal in Modals/${dir}/${file}`)
                continue
            }

            modals.set(modal.id, modal)
            new ConsoleInfo().show(`Modal "${modal.id}" geladen`)
        }
    }
}

async function importMenus() {
    const subDirs = fs.readdirSync('./ContextMenus')
    for (const dir of subDirs) {
        const files = fs.readdirSync(`./ContextMenus/${dir}`)
        for (const file of files) {
            const module = await import(`../ContextMenus/${dir}/${file}`)
            const menu = module.default
            if (!menu || !menu.data.name || !menu.data.type) {
                new ConsoleWarning().show(`Fehler bei Context Menu in ContextMenus/${dir}/${file}`)
                continue
            }

            menus.set(menu.data.name, menu)
            apps.push(menu)
            new ConsoleInfo().show(`ContextMenu "${menu.data.name}" geladen`)
        }
    }
}

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

async function importSelectMenus() {
    const subDirs = fs.readdirSync('./SelectMenus')
    for (const dir of subDirs) {
        const files = fs.readdirSync(`./SelectMenus/${dir}`)
        for (const file of files) {
            const module = await import(`../SelectMenus/${dir}/${file}`)
            const menu = module.default
            if (!menu || !menu.id) {
                new ConsoleWarning().show(`Fehler bei Select Menu in SelectMenus/${dir}/${file}`)
                continue
            }

            selectMenus.set(menu.id, menu)
            new ConsoleInfo().show(`Select Menu "${menu.id}" geladen`)
        }
    }
}

export default client;