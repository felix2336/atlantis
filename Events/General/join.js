const {GuildMember, Client} = require('discord.js')

module.exports = {
    name: 'guildMemberAdd',

    /**
     * @param {GuildMember} member
     * @param {Client} client 
     */

    async execute(member, client){
        member.roles.add('1149971550578147378')
    }
}