import { Colors, EmbedBuilder, TextChannel, Client, Guild, ChannelType } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'
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
    ticket = "1153007107688386752"
}
enum Categories {
    ticket = "1173314530521129042"
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
    reason: string,
}

class Warn {
    userid: string
    reason: string
    id: string


    constructor(data: WarnData) {
        this.userid = data.userid;
        this.reason = data.reason;
        this.id = this.generateId()
    }

    // public assignData(data: Warn){
    //     this.userid = data.userid
    //     this.reason = data.reason
    //     return this
    // }

    private generateId() {
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
        console.log(chalk.yellowBright(`[${new Date().toLocaleTimeString()} WARNING]`), chalk.whiteBright(message))
    }
}

//exports
export {
    Suggestion,
    SuggestionType,
    Warn,
    StaffPoll,
    MessageUser,
    Backup,
    Channels,
    Roles,
    Categories,
    ConsoleInfo,
    ConsoleWarning
}