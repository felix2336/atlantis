import { Guild, GuildMember, RoleResolvable, Snowflake, EmbedBuilder, Colors, TextChannel, Role, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { Channels } from '../Enums/Channels';
import { Roles } from '../Enums/Roles';
import { UnbanRequestButton } from '../Buttons/UnbanRequestButton';

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
        } catch (error) {
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
        await this.member.send({ embeds: [embed], components: [new ActionRowBuilder<ButtonBuilder>({components: [UnbanRequestButton]})] }).catch(console.log)
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
        await this.member.send({ embeds: [embed], components: [new ActionRowBuilder<ButtonBuilder>({components: [UnbanRequestButton]})] }).catch(console.log)
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