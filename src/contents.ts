import { ButtonInteraction, ChatInputCommandInteraction, Client, ClientOptions, Collection, ContextMenuCommandBuilder, Guild, InteractionResponse, Message, MessageContextMenuCommandInteraction, ModalSubmitInteraction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder, StringSelectMenuInteraction, UserContextMenuCommandInteraction } from 'discord.js'
import { AudioPlayer, createAudioPlayer } from '@discordjs/voice';
import { readdirSync } from 'fs'
import chalk from 'chalk'


export interface SlashCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder,
    execute: (interaction: ChatInputCommandInteraction, client: MyClient) => Promise<void> | Promise<InteractionResponse<boolean> | undefined> | Promise<Message<boolean>> | Promise<Message<boolean> | undefined>
}

export interface ContextMenu<T extends UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction> {
    data: ContextMenuCommandBuilder,
    execute: (interaction: T, client: MyClient) => Promise<void> | Promise<InteractionResponse<boolean> | undefined>
}

export interface Button {
    id: string,
    execute: (interaction: ButtonInteraction, client: MyClient) => Promise<void> | Promise<InteractionResponse<boolean> | undefined>
}

export interface SelectMenu {
    id: string
    execute: (interaction: StringSelectMenuInteraction, client: MyClient) => Promise<void>
}

export interface Modal {
    id: string,
    execute: (interaction: ModalSubmitInteraction, client: MyClient) => Promise<void>
}

export class ConsoleInfo {
    public show(message: string): void {
        console.log(chalk.greenBright(`[${new Date().toLocaleTimeString('de')} INFO]`), chalk.whiteBright(message))
    }
}

export class ConsoleWarning {
    public show(message: string): void {
        console.log(chalk.yellowBright(`[${new Date().toLocaleTimeString('de')} WARN] ${message}`))
    }
}

export class MyClient extends Client {
    public commands: Collection<string, SlashCommand>;
    public apps: SlashCommand[] & ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>[];
    public contextMenus: Collection<string, ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>>;
    public modals: Collection<string, Modal>;
    public selectMenus: Collection<string, SelectMenu>
    public buttons: Collection<string, Button>
    public guild!: Guild;
    public queue: { title: string, url: string, thumbnail: string, duration: string }[]
    public player!: AudioPlayer

    constructor(options: ClientOptions) {
        super(options)
        this.commands = new Collection()
        this.apps = []
        this.contextMenus = new Collection()
        this.modals = new Collection()
        this.selectMenus = new Collection
        this.buttons = new Collection()
        this.queue = []
    }

    public setGuild(guild: Guild) {
        this.guild = guild
    }
    public enableAudioPlayer() {
        this.player = createAudioPlayer()
        console.log('AudioPlayer aktiviert')
    }
    public async loadAll() {
        //select Menus
        const selectMenuSubdirs = readdirSync('./SelectMenus')
        for (const dir of selectMenuSubdirs) {
            const files = readdirSync(`./SelectMenus/${dir}`)
            for (const file of files) {
                const module = await import(`../SelectMenus/${dir}/${file}`)
                const menu = module.default as SelectMenu
                if (!menu || !menu.id) {
                    new ConsoleWarning().show(`Fehler bei Select Menu in SelectMenus/${dir}/${file}`)
                    continue
                }

                this.selectMenus.set(menu.id, menu)
                new ConsoleInfo().show(`Select Menu "${menu.id}" geladen`)
            }
        }

        //COMMANDS
        const commandSubdirs = readdirSync('./Commands')
        for (const dir of commandSubdirs) {
            const files = readdirSync(`./Commands/${dir}`)
            for (const file of files) {
                const module = await import(`../Commands/${dir}/${file}`)
                const command = module.default as SlashCommand
                if (!command || !command.data || !command.data.name || !command.data.description) {
                    new ConsoleInfo().show(`Befehl in Commands/${dir}/${file} ist ungültig`)
                    continue
                }

                this.commands.set(command.data.name, command)
                this.apps.push(command)
                new ConsoleInfo().show(`Befehl "/${command.data.name}" geladen`)
            }
        }

        //BUTTONS
        const buttonSubdirs = readdirSync('./Buttons')
        for (const dir of buttonSubdirs) {
            const files = readdirSync(`./Buttons/${dir}`)
            for (const file of files) {
                const module = await import(`../Buttons/${dir}/${file}`)
                const button = module.default as Button
                if (!button || !button.id) {
                    new ConsoleWarning().show(`Fehler bei Button in Buttons/${dir}/${file}`)
                    continue
                }

                this.buttons.set(button.id, button)
                new ConsoleInfo().show(`Button "${button.id}" geladen`)
            }
        }

        //MODALS
        const modalSubdirs = readdirSync('./Modals')
        for (const dir of modalSubdirs) {
            const files = readdirSync(`./Modals/${dir}`)
            for (const file of files) {
                const module = await import(`../Modals/${dir}/${file}`)
                const modal = module.default as Modal
                if (!modal || !modal.id) {
                    new ConsoleWarning().show(`Fehler bei Modal in Modals/${dir}/${file}`)
                    continue
                }

                this.modals.set(modal.id, modal)
                new ConsoleInfo().show(`Modal "${modal.id}" geladen`)
            }
        }

        //CONTEXT MENUS
        const contextMenuSubdirs = readdirSync('./ContextMenus')
        for (const dir of contextMenuSubdirs) {
            const files = readdirSync(`./ContextMenus/${dir}`)
            for (const file of files) {
                const module = await import(`../ContextMenus/${dir}/${file}`)
                const menu = module.default as ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>
                if (!menu || !menu.data.name || !menu.data.type) {
                    new ConsoleWarning().show(`Fehler bei Context Menu in ContextMenus/${dir}/${file}`)
                    continue
                }

                this.contextMenus.set(menu.data.name, menu)
                this.apps.push(menu)
                new ConsoleInfo().show(`ContextMenu "${menu.data.name}" geladen`)
            }
        }

        //EVENTS
        const eventSubdirs = readdirSync('./Events')
        for (const dir of eventSubdirs) {
            const files = readdirSync(`./Events/${dir}`)
            for (const file of files) {
                const module = await import(`../Events/${dir}/${file}`)
                const event = module.default
                if (!event || !event.name) {
                    new ConsoleWarning().show(`Fehler bei Event in Events/${dir}/${file}`)
                    continue
                }

                if (event.once) {
                    this.once(event.name, (...args: any[]) => event.execute(...args, this))
                } else {
                    this.on(event.name, (...args: any[]) => event.execute(...args, this))
                }


                new ConsoleInfo().show(`${event.name}-Event "${file.split('.')[0]}" geladen`)
            }
        }
    }
}