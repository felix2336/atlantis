const { Events, Client, EmbedBuilder, Message, GuildMember, Colors } = require('discord.js')
const DB = require('../../Schemas/messages')

module.exports = {
    name: Events.ClientReady,
    // name: Events.MessageCreate,

    /**
     * @param {Client} client
     */

    async execute(client) {
        // if (message.author.id != '773072144304963624') return;
        // if(message.content != 'messageCounterReset') return;
        // await message.react('✅')
        const channel = client.channels.cache.get('1196886539637112923')
        const guild = client.guilds.cache.get('1146113684435898439')
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

                for (let i = 0; i < leaderboard.length; i++) {
                    const entry = leaderboard[i]
                    const tmp = await guild.members.fetch(entry.user)
                    if (tmp) {
                        const DBentry = await DB.findOne({ user: entry.user })
                        DBentry.messagesSent.monday = 0
                        DBentry.messagesSent.tuesday = 0
                        DBentry.messagesSent.wednesday = 0
                        DBentry.messagesSent.thursday = 0
                        DBentry.messagesSent.friday = 0
                        DBentry.messagesSent.saturday = 0
                        DBentry.messagesSent.sunday = 0
                        DBentry.total = 0
                        await DBentry.save()
                    }
                    let member;
                    if (tmp instanceof GuildMember) {
                        member = tmp
                    } else if (tmp instanceof Collection) {
                        member = tmp.first()
                    }

                    if (member.roles.cache.has('1201848061819891774')) {
                        message += `\`\`${i + 1}. \`\`⏱️ <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                    } else {
                        if (entry.count < 100) {
                            message += `\`\`${i + 1}. \`\`<:AL_RedCross:1173483861959770184> <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                        } else {
                            message += `\`\`${i + 1}. \`\`<:AL_GreenHook:1173483826920574986> <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                        }
                    }
                }
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

        await checkAndDelete()
        setInterval(checkAndDelete, 60000)
    }
}