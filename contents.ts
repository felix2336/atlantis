import { Colors, EmbedBuilder, TextChannel, Guild, ChannelType, ActionRowBuilder, ButtonBuilder, GuildMember, RoleResolvable, Snowflake, Role, ClientOptions } from 'discord.js'
import { writeFileSync, appendFileSync } from 'fs'
import { ExtendedClient } from 'dcbot'
import { AudioPlayer, CreateAudioPlayerOptions, VoiceConnection, createAudioPlayer } from '@discordjs/voice'

export class MyClient extends ExtendedClient {
    public guild: Guild
    connection: VoiceConnection
    queue: { title: string, url: string, thumbnail: string, duration: string }[]
    player: AudioPlayer

    constructor(options: ClientOptions) {
        super(options)
        this.queue = []
    }

    public setGuild(guild: Guild) {
        this.guild = guild
    }

    public enableAudioPlayer(options?: CreateAudioPlayerOptions) {
        this.player = createAudioPlayer(options)
    }
}

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

export enum Channels {
    try_bans = "1266110288739176528",
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
    ticket_log = "1173939552239501333",
    user_update_log = "1221387141834084363",
    test = "1178073046444163102",
    giveaway = "1173357225721462804",
    selfrole = "1148123116590071828",
    ticket_transkripts = "1266433871201833121"
}
export enum Categories {
    ticket = "1173314530521129042",
    test = "1200875792452829184"
}
export enum Roles {
    staff = '1156298949301379212',
    community = "1149971550578147378",

}

export enum Selfroles {
    male = "1165352617191407656",
    female = "1165352742953439403",
    age13 = "1146341429153640448",
    age15 = "1148599932526264320",
    age18 = "1148600095495950376",
    age20 = "1148600180124430376",
    ios = "1148600312840597614",
    android = "1148600380561829921",
    pc = "1148600431359049789",
    konsole = "1148600598804041838",
    deutschland = "1149569712418734080",
    schweiz = "1149569751824220220",
    österreich = "1149569815229497444",
    italien = "1148637509962694747",
    niederlande = "1175444444129017897",
    frankreich = "1148637572516556840",
    mcjava = "1148667098072096788",
    mcbedrock = "1146113684486225967",
    rocketleague = "1148667193962283008",
    fortnite = "1148667318600220782",
    valorant = "1148667826245210132",
    clashofclans = "1148638144384749750",
    gta = "1148637979405996084",
    brawlstars = "1148638085379276810",
    callofduty = "1148638042014355496",
    poll = "1148638225963950220",
    news = "1148638271493132410",
    giveaways = "1148638318263799869",
    wop = "1175441946852991086", //wahrheit oder pflicht
    bump = "1173663419531022447",
    botstatus = "1160253015639457842",
    event = "1149728263179091989",
    allgemeines = "1149728389809311776",
    staffchanges = "1148638515840700497"
}

export enum Pings {
    giveaway = "<@&1148638318263799869>",
    bumping = '<@&1173663419531022447>'
}

export const ticketButtons = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder({
        customId: 'close-with-reason',
        label: '🔒 Schließen mit Begründung',
        style: 4
    }),
    new ButtonBuilder({
        customId: 'claim',
        label: '🙋‍♂️ Beanspruchen',
        style: 3
    })
])

export const unbanRequestButton = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder({
        label: 'Entbannungsantrag',
        customId: 'unban-request',
        style: 1,
    })
])

export interface Giveaway {
    messageId: string,
    prize: string,
    participants: string[],
    endTime: number
}

export interface MessageUserData {
    userid?: string,
    username?: string,
}

export class MessageUser {
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
        switch (day) {
            case 'monday': {
                this.messages.monday++
                break
            }
            case 'tuesday': {
                this.messages.tuesday++
                break
            }
            case 'wednesday': {
                this.messages.wednesday++
                break
            }
            case 'thursday': {
                this.messages.thursday++
                break
            }
            case 'friday': {
                this.messages.friday++
                break
            }
            case 'saturday': {
                this.messages.saturday++
                break
            }
            case 'sunday': {
                this.messages.sunday++
                break
            }
        }
    }

    public getMessagesOfDay(dayNumber: number): number {
        const day = this.getDayByIndex(dayNumber)
        switch (day) {
            case 'monday': {
                return this.messages.monday
            }
            case 'tuesday': {
                return this.messages.tuesday
            }
            case 'wednesday': {
                return this.messages.wednesday
            }
            case 'thursday': {
                return this.messages.thursday
            }
            case 'friday': {
                return this.messages.friday
            }
            case 'saturday': {
                return this.messages.saturday
            }
            case 'sunday': {
                return this.messages.sunday
            }
            default: {
                return 0
            }
        }
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

export class Backup {
    categories?: any;

    constructor(data?: Backup) {
        this.categories = data?.categories
    }

    public save(guild: Guild) {
        const categories: any = {}
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

export class MemberManager {
    private member: GuildMember
    private guild: Guild

    constructor(member: GuildMember, guild: Guild) {
        this.member = member
        this.guild = guild
    }

    public getMember(): GuildMember {
        return this.member
    }

    public async addRole(roleOrRoles: RoleResolvable | RoleResolvable[]): Promise<void> {
        await this.member.roles.add(roleOrRoles).catch(console.log)
    }

    public async removeRole(roleOrRoles: RoleResolvable | RoleResolvable[]): Promise<void> {
        await this.member.roles.remove(roleOrRoles).catch(console.log)
    }

    public hasRole(role: Snowflake): boolean {
        return this.member.roles.cache.has(role)
    }

    public async ban(moderator: GuildMember, reason: string, deleteMessageSeconds?: number): Promise<boolean> {
        try {
            await this.member.ban({ reason })
        } catch(error) {
            return false
        }

        const embed = new EmbedBuilder({
            author: { name: this.guild.name, iconURL: this.guild.iconURL() || '' },
            title: 'Du wurdest gebannt',
            description: `Grund: **${reason}**.\n\nDu kannst mit dem Button unten einen Entbannungsantrag stellen!`,
            color: Colors.Red
        })

        const logEmbed = new EmbedBuilder({
            title: 'Neuer Ban',
            fields: [
                { name: 'User', value: `${this.member} (${this.member.user.username}) - ${this.member.user.id}` },
                { name: 'Grund', value: reason }
            ],
            footer: { text: `Durchgeführt von ${moderator.user.username}`, iconURL: moderator.user.displayAvatarURL() }
        })
        const channel = this.guild.channels.cache.get(Channels.user_update_log) as TextChannel
        await this.member.send({ embeds: [embed], components: [unbanRequestButton] }).catch(console.log)
        await channel.send({ embeds: [logEmbed] }).catch(console.log)
        return true
    }

    public async kick(moderator: GuildMember, reason: string): Promise<boolean> {
        await this.member.kick(reason).catch(e => {
            console.log(e)
            return false
        })

        const embed = new EmbedBuilder({
            author: { name: this.guild.name, iconURL: this.guild.iconURL() || '' },
            title: 'Du wurdest gekickt',
            description: `Grund: **${reason}**.`,
            color: Colors.Red
        })

        const logEmbed = new EmbedBuilder({
            title: 'Neuer Kick',
            fields: [
                { name: 'User', value: `${this.member} (${this.member.user.username}) - ${this.member.user.id}` },
                { name: 'Grund', value: reason }
            ],
            footer: { text: `Durchgeführt von ${moderator.user.username}`, iconURL: moderator.user.displayAvatarURL() }
        })
        const channel = this.guild.channels.cache.get(Channels.user_update_log) as TextChannel
        await this.member.send({ embeds: [embed], components: [unbanRequestButton] }).catch(console.log)
        await channel.send({ embeds: [logEmbed] }).catch(console.log)
        return true
    }

    public getId(): string {
        return this.member.user.id
    }

    public getAvatarUrl(): string | undefined {
        return this.member.displayAvatarURL()
    }

    public getPermissions(): string[] {
        const perms: string[] = []
        for (const perm of this.member.permissions) {
            perms.push(perm)
        }
        perms.sort()
        return perms
    }

    public getRoles(): Role[] {
        const roles: Role[] = []
        for (const [id, role] of this.member.roles.cache) {
            if (role.name == '@everyone') continue
            roles.push(role)
        }
        roles.sort((a, b) => b.position - a.position)
        return roles
    }

    public isStaff(): boolean {
        return this.member.roles.cache.some(r => r.id == Roles.staff)
    }
}

export function countdown(ms: number) {
    return `<t:${Math.floor(ms / 1000)}:R>`
}

export function Err(err: Error): void {
    const writeString = `${new Date().toLocaleDateString('ru')} - ${new Date().toLocaleTimeString('de')}\n${err}\n\n`
    console.log(err)
    appendFileSync('./errors.log', writeString)
}
