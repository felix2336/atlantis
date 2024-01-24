const { Message, Client, Events } = require('discord.js')
const DB = require('../../Schemas/messages')

function getDay(dayNumber) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[dayNumber];
}

module.exports = {
    name: Events.MessageCreate,

    /**
     * @param {Message} message 
     * @param {Client} client
     */

    async execute(message, client) {
        if (message.author.bot) return;
        if (!message.member.roles.cache.has('1156298949301379212')) return;
        if (message.channel.parentId == '1156996872657977394') return;
        if (message.channel.parentId == '1180678820085370940') return;

        let User = await DB.findOne({ user: message.author.id })
        if (!User) {
            User = await DB.create({
                user: message.author.id,
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
        const day = new Date().getDay()

        User.messagesSent[getDay(day)]++;
        User.total++;
        await User.save();
    }
}