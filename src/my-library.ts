import { Client, ClientOptions, Collection, Colors, EmbedBuilder, Guild, MessageContextMenuCommandInteraction, TextChannel, UserContextMenuCommandInteraction } from 'discord.js'
import { Button, ConsoleInfo, ConsoleWarning, ContextMenu, Modal, SelectMenu, SlashCommand } from '../contents'
import { readdirSync } from 'fs'
import { AudioPlayer, createAudioPlayer } from '@discordjs/voice'
export enum SuggestionType {
    Server = 1,
    Bot = 2
}
export interface SuggestionData {
    user: string,
    suggestion: string,
    type: SuggestionType
}
export class Cooldown<K extends string, V extends number> {
    private storage: Record<string, V>

    constructor() {
        this.storage = {}
    }

    delete(key: K): boolean {
        const keyString = String(key)
        if (this.storage[keyString]) {
            delete this.storage[keyString]
            return true
        }
        return false
    }
    has(key: K): boolean {
        const keyString = String(key)
        return this.storage[keyString] !== undefined
    }
    isExpired(key: K): boolean {
        const keyString = String(key)
        const n = Date.now()
        if (this.storage[keyString] < n || !this.storage[keyString]) {
            return true
        }
        return false
    }
    set(key: K, value: V): void {
        const keyString = String(key)
        this.storage[keyString] = value
    }
}
export class MyClient extends Client {
    public commands: Collection<string, SlashCommand>;
    public apps: SlashCommand[] & ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>[];
    public contextMenus: Collection<string, ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>>;
    public modals: Collection<string, Modal>;
    public selectMenus: Collection<string, SelectMenu>
    public buttons: Collection<string, Button>
    public guild: Guild | undefined
    public queue: { title: string, url: string, thumbnail: string, duration: string }[]
    public player: AudioPlayer | undefined

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
}
export class Suggestion {
    user: string
    suggestion: string
    type: SuggestionType

    constructor(data: SuggestionData) {
        this.user = data.user
        this.suggestion = data.suggestion
        this.type = data.type
    }

    public async submit(channel: TextChannel) {
        const embed = new EmbedBuilder({
            title: 'Neuer Vorschlag',
            description: `<@${this.user}> hat einen neuen ${this.getTypeString()} eingereicht:\n\n**${this.suggestion}**`,
            color: Colors.DarkAqua
        })

        await channel.send({ embeds: [embed] })
    }

    private getTypeString() {
        if (this.type == 1) return 'Server Vorschlag'
        else if (this.type == 2) return 'Bot Vorschlag'
    }
}