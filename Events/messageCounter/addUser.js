const { Client, GuildMember, Events } = require('discord.js')
const DB = require('../../Schemas/messages')

module.exports = {
    name: Events.GuildMemberUpdate,

    /**
     * @param {GuildMember} oldMember 
     * @param {GuildMember} newMember
     */

    async execute(oldMember, newMember) {
        if (oldMember.user.bot) return;
        const staffrole = '1156298949301379212'
        if (!oldMember.roles.cache.has(staffrole) && newMember.roles.cache.has(staffrole)) {
            await DB.create({
                user: newMember.user.id,
                messagesSent: {
                    monday: 0,
                    tuesday: 0,
                    wednesday: 0,
                    thursday: 0,
                    friday: 0,
                    saturday: 0,
                    sunday: 0
                },
                total: 0
            })
        }
        if (oldMember.roles.cache.has(staffrole) && !newMember.roles.cache.has(staffrole)) {
            const User = await DB.findOne({ user: newMember.user.id })
            await DB.deleteOne({user: User.user})
        }
    }
}