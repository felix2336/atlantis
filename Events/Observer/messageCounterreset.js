const { Events, Client } = require('discord.js')
const DB = require('../../Schemas/messages')

module.exports = {
    name: Events.ClientReady,

    /**
     * @param {Client} client
     */

    async execute(client){
        const channel = client.channels.cache.get('1196886539637112923')

        const checkAndDelete = async () => {
            const date = new Date()
            if(date.getDay() == 0 && date.getHours() == 23 && date.getMinutes() == 59){
                const Users = await DB.find({})
                const leaderboard = []

                for (const User of Users) {
                    leaderboard.push({ user: User.user, count: User.total })
                }

                const sorted = leaderboard.sort((a, b) => b.count - a.count)
                let message = ''

                sorted.forEach((user, index) => {
                    message += `\`\`${index + 1}. \`\` <@${user.user}> **• ${user.count}** Nachrichten gesendet.`
                })
                const embed = new EmbedBuilder({
                    title: 'Weekly Messages Leaderboard',
                    description: message,
                    color: Colors.Aqua
                })

                channel.send({embeds: [embed]})
                for(const User of Users){
                    await DB.deleteOne({user: User.user})
                }
            }
        }

        checkAndDelete()
        setInterval(checkAndDelete, 60000)
    }
}