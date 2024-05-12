import { Colors, EmbedBuilder, TextChannel, Client, Guild, ChannelType, Collection } from 'discord.js'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import chalk from 'chalk'

//general enums
enum Channels {
    teamliste = "1173357582933573722",
    warn = "1160607902210470009",
    suggestion = "1230234007854120960",
    message_leaderboard = "1196886539637112923",
    clan_ticket = "1203371307811471451",
    welcome = "1146113685962625127",
    rules = "1146113685962625128",
    ticket = "1153007107688386752",
    unban_requests = "1236848025788481638",
    beichten = "1238589282747285584",
    ticket_log = "1173939552239501333"
}
enum Categories {
    ticket = "1173314530521129042",
    test = "1200875792452829184"
}
enum Roles {
    staff = '1156298949301379212',
    community = "1149971550578147378"
}


//suggestion
enum SuggestionType {
    Server = 1,
    Bot = 2
}

interface SuggestionData {
    user: string,
    suggestion: string,
    type: SuggestionType
}

class Suggestion {

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

//warn
interface WarnData {
    userid: string,
    username: string,
    warns?: { date: string, reason: string, moderator: string, id: string }[]
}

class Warn {
    userid: string
    username: string
    private warns: { date: string, reason: string, moderator: string, id: string }[]


    constructor(data: WarnData) {
        this.userid = data.userid;
        this.username = data.username;
        if(data.warns) {
            this.warns = data.warns
        } else {
            this.warns = []
        }
    }
    public addWarn(moderator: string, reason: string): void {
        this.warns.push({
            date: new Date().toLocaleDateString('ger'),
            moderator,
            reason,
            id: this.generateWarnId()
        })
    }

    public removeWarn(warnId: string): boolean {
        const warnToRemove = this.warns.find(w => w.id == warnId)
        if(warnToRemove) {
            this.warns = this.warns.filter(w => w.id != warnId)
            return true
        } else return false
    }

    public getWarnsAsEmbed(): EmbedBuilder {
        const e = new EmbedBuilder({
            title: `Warns von ${this.username}`,
            description: '',
            color: Colors.Aqua
        })

        for (const warn of this.warns) {
            e.data.description += `${warn.date} von ${warn.moderator}\nGrund: **${warn.reason}**\nWarn-ID: \`${warn.id}\`\n\n`
        }

        return e
    }

    public save(): void {
        let warns = JSON.parse(readFileSync('./JSON/warns.json', 'utf8')) as Warn[]
        if (warns.find(w => w.userid == this.userid)) {
            warns = warns.filter(w => w.userid != this.userid)
        }
        warns.push(this)
        writeFileSync('./JSON/warns.json', JSON.stringify(warns, null, 2), 'utf8')
    }

    private generateWarnId() {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';
        let id: string = "";

        for (let index = 0; index < 5; index++) {
            const randIndex = Math.floor(Math.random() * charset.length)
            id += charset.charAt(randIndex)
        }

        return id;
    }
}

//staff-poll
interface StaffPollOptions {
    id: string | undefined,
    question: string | undefined,
    multiple: boolean | undefined,
}

class StaffPoll {
    id: string | undefined
    question: string | undefined
    multiple: boolean | undefined
    options: { name: string, votes: string[] }[]
    participants: string[]

    constructor(data?: StaffPollOptions) {
        this.id = data?.id
        this.question = data?.question
        this.multiple = data?.multiple
        this.participants = []
        this.options = []
    }

    public addOption(name: string) {
        this.options.push({ name: name, votes: [] })
        return true
    }

    public voteForOption(optionIndex: number, userId: string) {
        if (this.isVotedForOption(optionIndex, userId)) return false
        this.options[optionIndex].votes.push(userId)
        this.participants.push(userId)
        return true
    }

    public assignData(data: this): StaffPoll {
        this.id = data.id
        this.question = data.question
        this.multiple = data.multiple
        this.options = data.options
        this.participants = data.participants

        return this
    }

    private isVotedForOption(optionIndex: number, userId: string): boolean {
        const option = this.getOptionByName(optionIndex)
        if (!option) throw new Error("Invalid Option Index")
        return option.votes.includes(userId)
    }

    private getOptionByName(index: number): { name: string, votes: string[] } | undefined {
        return this.options[Math.floor(index)]
    }
}

//staff-messages
interface MessageUserData {
    userid?: string,
    username?: string,
}
class MessageUser {
    userid?: string
    username?: string
    private totalMessages: number
    private messages: {
        monday: number,
        tuesday: number,
        wednesday: number,
        thursday: number,
        friday: number,
        saturday: number,
        sunday: number
    }

    constructor(data?: MessageUserData) {
        this.userid = data?.userid;
        this.username = data?.username;
        this.totalMessages = 0;
        this.messages = {
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0
        };
    }

    public addMessage(dayNumber: number) {
        const day = this.getDayByIndex(dayNumber)
        this.totalMessages++;
        this.messages[day]++
    }

    public getMessagesOfDay(dayNumber: number): number {
        const day = this.getDayByIndex(dayNumber)
        return this.messages[day];
    }

    public getTotalMessages(): number {
        return this.totalMessages
    }

    public resetMessages() {
        this.totalMessages = 0;
        this.totalMessages = 0;
        this.messages = {
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0
        };
    }

    public assignData(data: MessageUser): MessageUser {
        this.userid = data.userid
        this.username = data.username
        this.totalMessages = data.totalMessages
        this.messages.monday = data.messages.monday
        this.messages.tuesday = data.messages.tuesday
        this.messages.wednesday = data.messages.wednesday
        this.messages.thursday = data.messages.thursday
        this.messages.friday = data.messages.friday
        this.messages.saturday = data.messages.saturday
        this.messages.sunday = data.messages.sunday
        return this
    }

    private getDayByIndex(index: number): string {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        return days[index]
    }
}

//backup system
class Backup {
    categories?: {}

    constructor(data?: Backup) {
        this.categories = data?.categories
    }

    public save(guild: Guild) {
        const categories = {}
        guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).forEach(category => {
            categories[category.name] = {};

            guild.channels.cache.filter(channel => channel.parentId === category.id).forEach(channel => {
                categories[category.name][channel.name] = channel.type;
            });
        });
        this.categories = categories
        writeFileSync('./JSON/backup.json', JSON.stringify(this, null, 2), 'utf8')
    }

    public async load(guild: Guild) {
        for (const category in this.categories) {
            const cat = await guild.channels.create({
                name: category,
                type: ChannelType.GuildCategory,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone,
                        deny: ['ViewChannel']
                    }
                ]
            })

            const channelData = this.categories[category]
            for (const channel in channelData) {
                const channelType = channelData[channel]

                await guild.channels.create({
                    name: channel,
                    type: channelType,
                    parent: cat
                })
            }
        }
    }
}

class ConsoleInfo {
    public show(message: string): void {
        console.log(chalk.greenBright(`[${new Date().toLocaleTimeString()} INFO]`), chalk.whiteBright(message))
    }
}

class ConsoleWarning {
    public show(message: string): void {
        console.log(chalk.yellowBright(`[${new Date().toLocaleTimeString()} WARN] ${message}`))
    }
}

async function importSelectMenus(): Promise<Collection<string, any>> {
    const selectMenus = new Collection<string, any>()
    const subDirs = readdirSync('./SelectMenus')
    for (const dir of subDirs) {
        const files = readdirSync(`./SelectMenus/${dir}`)
        for (const file of files) {
            const module = await import(`./SelectMenus/${dir}/${file}`)
            const menu = module.default
            if (!menu || !menu.id) {
                new ConsoleWarning().show(`Fehler bei Select Menu in SelectMenus/${dir}/${file}`)
                continue
            }

            selectMenus.set(menu.id, menu)
            new ConsoleInfo().show(`Select Menu "${menu.id}" geladen`)
        }
    }
    return selectMenus
}

async function importCommands(): Promise<[Collection<string, any>, any[]]> {
    const commands = new Collection<string, any>()
    const apps: any[] = []
    const subDirs = readdirSync('./Commands')
    for (const dir of subDirs) {
        const files = readdirSync(`./Commands/${dir}`)
        for (const file of files) {
            const module = await import(`./Commands/${dir}/${file}`)
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
    return [commands, apps]
}

async function importButtons(): Promise<Collection<string, any>> {
    const buttons = new Collection<string, any>()
    const subDirs = readdirSync('./Buttons')
    for (const dir of subDirs) {
        const files = readdirSync(`./Buttons/${dir}`)
        for (const file of files) {
            const module = await import(`./Buttons/${dir}/${file}`)
            const button = module.default
            if (!button || !button.id) {
                new ConsoleWarning().show(`Fehler bei Button in Buttons/${dir}/${file}`)
                continue
            }

            buttons.set(button.id, button)
            new ConsoleInfo().show(`Button "${button.id}" geladen`)
        }
    }
    return buttons
}

async function importModals(): Promise<Collection<string, any>> {
    const modals = new Collection<string, any>()
    const subDirs = readdirSync('./Modals')
    for (const dir of subDirs) {
        const files = readdirSync(`./Modals/${dir}`)
        for (const file of files) {
            const module = await import(`./Modals/${dir}/${file}`)
            const modal = module.default
            if (!modal || !modal.id) {
                new ConsoleWarning().show(`Fehler bei Modal in Modals/${dir}/${file}`)
                continue
            }

            modals.set(modal.id, modal)
            new ConsoleInfo().show(`Modal "${modal.id}" geladen`)
        }
    }
    return modals
}

async function importMenus(apps: any[]): Promise<[Collection<string, any>, any[]]> {
    const menus = new Collection<string, any>()
    const subDirs = readdirSync('./ContextMenus')
    for (const dir of subDirs) {
        const files = readdirSync(`./ContextMenus/${dir}`)
        for (const file of files) {
            const module = await import(`./ContextMenus/${dir}/${file}`)
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
    return [menus, apps]
}

//exports
export {
    Suggestion,
    SuggestionType,
    Warn,
    WarnData,
    StaffPoll,
    MessageUser,
    Backup,
    Channels,
    Roles,
    Categories,
    ConsoleInfo,
    ConsoleWarning,
    importSelectMenus,
    importCommands,
    importButtons,
    importModals,
    importMenus
}