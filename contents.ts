import { Colors, EmbedBuilder, TextChannel, Client, Guild,ClientOptions, ChannelType, Collection, ActionRowBuilder, ButtonBuilder, GuildMember, RoleResolvable, resolvePartialEmoji, SystemChannelFlagsBitField, Snowflake, Role, Activity, SlashCommandBuilder, ChatInputCommandInteraction, ContextMenuCommandBuilder, UserContextMenuCommandInteraction, MessageContextMenuCommandInteraction, ButtonInteraction, BaseSelectMenuBuilder, RoleSelectMenuBuilder, ChannelSelectMenuBuilder, UserSelectMenuBuilder, StringSelectMenuBuilder, MentionableSelectMenuBuilder, AnySelectMenuInteraction, ModalSubmitInteraction, ApplicationCommandDataResolvable, CacheType, StringSelectMenuInteraction, UserSelectMenuInteraction, SelectMenuInteraction, Events, SlashCommandSubcommandsOnlyBuilder, SlashCommandOptionsOnlyBuilder, InteractionResponse, Message, ContextMenuCommandInteraction } from 'discord.js'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import chalk from 'chalk'

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
    ticket_log = "1173939552239501333",
    user_update_log = "1221387141834084363"
}
enum Categories {
    ticket = "1173314530521129042",
    test = "1200875792452829184"
}
enum Roles {
    staff = '1156298949301379212',
    community = "1149971550578147378"
}

const ticketButtons = new ActionRowBuilder<ButtonBuilder>().addComponents([
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

const unbanRequestButton = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder({
        label: 'Entbannungsantrag',
        customId: 'unban-request',
        style: 1,
    })
])

interface SlashCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder,
    execute: (interaction: ChatInputCommandInteraction, client: MyClient) => Promise<void> | Promise<InteractionResponse<boolean> | undefined> | Promise<Message<boolean>>
}

interface ContextMenu<T extends UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction> {
    data: ContextMenuCommandBuilder,
    execute: (interaction: T, client: MyClient) => Promise<void> | Promise<InteractionResponse<boolean> | undefined>
}

interface Button {
    id: string,
    execute: (interaction: ButtonInteraction, client: MyClient) => Promise<void>
}

interface SelectMenu {
    id: string
    execute: (interaction: StringSelectMenuInteraction, client: MyClient) => Promise<void>
}

interface Modal {
    id: string,
    execute: (interaction: ModalSubmitInteraction, client: MyClient) => Promise<void>
}

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
        if (data.warns) {
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
        if (warnToRemove) {
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

class MemberManager {
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
        await this.member.ban({ reason, deleteMessageSeconds })
            .catch(e => {
                console.log(e)
                return false
            })

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
            footer: {text: `Durchgeführt von ${moderator.user.username}`, iconURL: moderator.user.displayAvatarURL()}
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

class MyClient extends Client<boolean> {
    public commands: Collection<string, SlashCommand>;
    public apps: SlashCommand[] & ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>[];
    public contextMenus: Collection<string, ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>>;
    public modals: Collection<string, Modal>;
    public selectMenus: Collection<string, SelectMenu>
    public buttons: Collection<string, Button>
    public guild: Guild

    constructor(options: ClientOptions){
        super(options)
        this.commands = new Collection()
        this.apps = []
        this.contextMenus = new Collection()
        this.modals = new Collection()
        this.selectMenus = new Collection
        this.buttons = new Collection()
        this.guild = this.guilds.cache.get('1146113684435898439')!
    }
}

async function importSelectMenus(client: MyClient): Promise<void> {
    const subDirs = readdirSync('./SelectMenus')
    for (const dir of subDirs) {
        const files = readdirSync(`./SelectMenus/${dir}`)
        for (const file of files) {
            const module = await import(`./SelectMenus/${dir}/${file}`)
            const menu = module.default as SelectMenu
            if (!menu || !menu.id) {
                new ConsoleWarning().show(`Fehler bei Select Menu in SelectMenus/${dir}/${file}`)
                continue
            }

            client.selectMenus.set(menu.id, menu)
            new ConsoleInfo().show(`Select Menu "${menu.id}" geladen`)
        }
    }
}

async function importCommands(client: MyClient): Promise<void> {
    const cw = new ConsoleWarning()
    const ci = new ConsoleInfo()
    const subDirs = readdirSync('./Commands')
    for (const dir of subDirs) {
        const files = readdirSync(`./Commands/${dir}`)
        for (const file of files) {
            const module = await import(`./Commands/${dir}/${file}`)
            const command = module.default as SlashCommand
            if (!command || !command.data || !command.data.name || !command.data.description) {
                cw.show(`Befehl in Commands/${dir}/${file} ist ungültig`)
                continue
            }

            client.commands.set(command.data.name, command)
            client.apps.push(command)
            ci.show(`Befehl "/${command.data.name}" geladen`)
        }
    }
}

async function importButtons(client: MyClient): Promise<void> {
    const subDirs = readdirSync('./Buttons')
    for (const dir of subDirs) {
        const files = readdirSync(`./Buttons/${dir}`)
        for (const file of files) {
            const module = await import(`./Buttons/${dir}/${file}`)
            const button = module.default as Button
            if (!button || !button.id) {
                new ConsoleWarning().show(`Fehler bei Button in Buttons/${dir}/${file}`)
                continue
            }

            client.buttons.set(button.id, button)
            new ConsoleInfo().show(`Button "${button.id}" geladen`)
        }
    }
}

async function importModals(client: MyClient): Promise<void> {
    const subDirs = readdirSync('./Modals')
    for (const dir of subDirs) {
        const files = readdirSync(`./Modals/${dir}`)
        for (const file of files) {
            const module = await import(`./Modals/${dir}/${file}`)
            const modal = module.default as Modal
            if (!modal || !modal.id) {
                new ConsoleWarning().show(`Fehler bei Modal in Modals/${dir}/${file}`)
                continue
            }

            client.modals.set(modal.id, modal)
            new ConsoleInfo().show(`Modal "${modal.id}" geladen`)
        }
    }
}

async function importMenus(client: MyClient): Promise<void> {
    const subDirs = readdirSync('./ContextMenus')
    for (const dir of subDirs) {
        const files = readdirSync(`./ContextMenus/${dir}`)
        for (const file of files) {
            const module = await import(`./ContextMenus/${dir}/${file}`)
            const menu = module.default as ContextMenu<MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction>
            if (!menu || !menu.data.name || !menu.data.type) {
                new ConsoleWarning().show(`Fehler bei Context Menu in ContextMenus/${dir}/${file}`)
                continue
            }

            client.contextMenus.set(menu.data.name, menu)
            client.apps.push(menu)
            new ConsoleInfo().show(`ContextMenu "${menu.data.name}" geladen`)
        }
    }
}

async function importEvents(client: MyClient): Promise<void> {
    const subDirs = readdirSync('./Events')
    for (const dir of subDirs) {
        const files = readdirSync(`./Events/${dir}`)
        for (const file of files) {
            const module = await import(`./Events/${dir}/${file}`)
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

export {
    Suggestion,
    SuggestionType,
    Warn,
    WarnData,
    MessageUser,
    Backup,
    Channels,
    Roles,
    Categories,
    ConsoleInfo,
    ConsoleWarning,
    MemberManager,
    MyClient,
    SelectMenu,
    SlashCommand,
    Modal,
    Button,
    ContextMenu,
    importSelectMenus,
    importCommands,
    importButtons,
    importModals,
    importMenus,
    importEvents,
    ticketButtons,
    unbanRequestButton
}