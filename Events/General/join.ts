import { GuildMember, Client } from 'discord.js'

export default {
    name: 'guildMemberAdd',

    async execute(member: GuildMember){
        member.roles.add('1149971550578147378')
    }
}