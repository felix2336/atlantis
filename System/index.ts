import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js'
import fs from 'fs'
import chalk from 'chalk'

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
const apps: any[] = []

await importCommands()
await importButtons()
await importModals()
await importMenus()
await importEvents()

client.on("interactionCreate", async interaction => {
    switch(true){
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
    console.log(chalk.yellowBright('Slash Commands:'))
    const subDirs = fs.readdirSync('./Commands')
    for (const dir of subDirs) {
        console.log(chalk.cyanBright(`${dir}`))
        const files = fs.readdirSync(`./Commands/${dir}`)
        for (const file of files) {
            const module = await import(`../Commands/${dir}/${file}`)
            const command = module.default
            if (!command || !command.data || !command.data.name || !command.data.description) {
                console.log(chalk.redBright(file), chalk.yellowBright('(Fehler beim Command)'))
                continue
            }

            commands.set(command.data.name, command)
            apps.push(command)
            console.log('  ', chalk.greenBright(command.data.name))
        }
    }
}

async function importButtons() {
    console.log(chalk.yellowBright('Buttons:'))
    const subDirs = fs.readdirSync('./Buttons')
    for (const dir of subDirs) {
        console.log(chalk.cyanBright(`${dir}`))
        const files = fs.readdirSync(`./Buttons/${dir}`)
        for (const file of files) {
            const module = await import(`../Buttons/${dir}/${file}`)
            const button = module.default
            if (!button || !button.id) {
                console.log(chalk.redBright(file), chalk.yellowBright('(Fehler beim Button)'))
                continue
            }

            buttons.set(button.id, button)
            console.log('  ', chalk.greenBright(button.id))
        }
    }
}

async function importModals() {
    console.log(chalk.yellowBright('Modals:'))
    const subDirs = fs.readdirSync('./Modals')
    for (const dir of subDirs) {
        console.log(chalk.cyanBright(`${dir}`))
        const files = fs.readdirSync(`./Modals/${dir}`)
        for (const file of files) {
            const module = await import(`../Modals/${dir}/${file}`)
            const modal = module.default
            if (!modal || !modal.id) {
                console.log(chalk.redBright(file), chalk.yellowBright('(Fehler beim Button)'))
                continue
            }

            modals.set(modal.id, modal)
            console.log('  ', chalk.greenBright(modal.id))
        }
    }
}

async function importMenus() {
    console.log(chalk.yellowBright('Context Menus:'))
    const subDirs = fs.readdirSync('./ContextMenus')
    for (const dir of subDirs) {
        console.log(chalk.cyanBright(`${dir}`))
        const files = fs.readdirSync(`./ContextMenus/${dir}`)
        for (const file of files) {
            const module = await import(`../ContextMenus/${dir}/${file}`)
            const menu = module.default
            if (!menu || !menu.data.name || !menu.data.type) {
                console.log(chalk.redBright(file), chalk.yellowBright('(Fehler beim Menu)'))
                continue
            }

            menus.set(menu.data.name, menu)
            apps.push(menu)
            console.log('  ', chalk.greenBright(menu.data.name))
        }
    }
}

async function importEvents() {
    console.log(chalk.yellowBright('Events:'))
    const subDirs = fs.readdirSync('./Events')
    for (const dir of subDirs) {
        console.log(chalk.cyanBright(`${dir}`))
        const files = fs.readdirSync(`./Events/${dir}`)
        for (const file of files) {
            const module = await import(`../Events/${dir}/${file}`)
            const event = module.default
            if (!event || !event.name) {
                console.log(chalk.redBright(file), chalk.yellowBright('(Fehler beim Command)'))
                continue
            }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client))
            } else {
                client.on(event.name, (...args) => event.execute(...args, client))
            }


            console.log('  ', chalk.greenBright(file.split('.').shift()))
        }
    }
}