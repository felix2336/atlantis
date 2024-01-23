const { Events, Client, EmbedBuilder, Message, Colors } = require('discord.js')
const DB = require('../../Schemas/messages')

module.exports = {
    name: Events.ClientReady,

    /**
     * @param {Message} message
     * @param {Client} client
     */

    async execute(message, client) {
        const channel = client.channels.cache.get('1196886539637112923')
        const checkAndDelete = async () => {
            const date = new Date()
            if (date.getDay() == 0 && date.getHours() == 23 && date.getMinutes() == 59) {
                const Users = await DB.find({})
                const leaderboard = []

                for (const User of Users) {
                    leaderboard.push({ user: User.user, count: User.total })
                }

                const sorted = leaderboard.sort((a, b) => b.count - a.count)
                let message = ''

                sorted.forEach((user, index) => {
                    message += `\`\`${index + 1}. \`\` <@${user.user}> **• ${user.count}** Nachrichten gesendet.\n`
                })
                const embed = new EmbedBuilder({
                    title: 'Weekly Messages Leaderboard',
                    description: message,
                    color: Colors.Aqua
                })

                channel.send({ embeds: [embed] })
                for (const User of Users) {
                    User.total = 0
                    User.messagesSent.sunday = 0
                    User.messagesSent.monday = 0
                    User.messagesSent.tuesday = 0
                    User.messagesSent.wednesday = 0
                    User.messagesSent.thursday = 0
                    User.messagesSent.friday = 0
                    User.messagesSent.saturday = 0
                    await User.save()
                }
            }
        }
        if (message.author.id == '773072144304963624' && message.content == 'emulateCounterReset') return await checkAndDelete()


        await checkAndDelete()
        setInterval(checkAndDelete, 60000)
    }
}