import { Guild, GuildMember, RoleResolvable, Snowflake, Role } from 'discord.js';
export declare class MemberManager {
    private member;
    private guild;
    constructor(member: GuildMember, guild: Guild);
    getMember(): GuildMember;
    addRole(roleOrRoles: RoleResolvable | RoleResolvable[]): Promise<void>;
    removeRole(roleOrRoles: RoleResolvable | RoleResolvable[]): Promise<void>;
    hasRole(role: Snowflake): boolean;
    ban(moderator: GuildMember, reason: string, deleteMessageSeconds?: number): Promise<boolean>;
    kick(moderator: GuildMember, reason: string): Promise<boolean>;
    getId(): string;
    getAvatarUrl(): string | undefined;
    getPermissions(): string[];
    getRoles(): Role[];
    isStaff(): boolean;
}
