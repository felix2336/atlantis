import { Events, Client, EmbedBuilder, Message, GuildMember, Colors, Guild, TextChannel } from 'discord.js'
import { MessageUser, Channels } from '../../contents'
import { readFileSync, writeFileSync } from 'fs'
import { Event } from 'dcbot'

export default new Event( {
    name: Events.ClientReady,
    // name: Events.MessageCreate,

    async execute(/*message: Message,*/ client: Client) {
        // if (message.author.id != '773072144304963624') return;
        // if(message.content != 'messageCounterReset') return;
        // await message.react('✅')
        const channel = client.channels.cache.get(Channels.message_leaderboard) as TextChannel
        const guild = client.guilds.cache.get('1146113684435898439') as Guild
        const checkAndDelete = async () => {
            const date = new Date()
            if (date.getDay() == 0 && date.getHours() == 23 && date.getMinutes() == 59) {
                let DB = JSON.parse(readFileSync('./JSON/messages.json', 'utf8')) as MessageUser[]
                const leaderboard: { user: string, count: number }[] = []

                for (const UserData of DB) {
                    const User = new MessageUser().assignData(UserData)
                    leaderboard.push({ user: User.userid!, count: User.getTotalMessages() })
                    User.resetMessages()
                    DB = DB.filter(u => u.userid != User.userid)
                    DB.push(User)
                    writeFileSync('./JSON/messages.json', JSON.stringify(DB, null, 2), 'utf8')
                }

                const sorted = leaderboard.sort((a, b) => b.count - a.count)
                let message = ''

                for (let i = 0; i < leaderboard.length; i++) {
                    const entry = leaderboard[i]
                    const member = await guild.members.fetch(entry.user)

                    if (member.roles.cache.has('1201848061819891774')) {
                        message += `\`\`${i + 1}. \`\`⏱️ <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                    } else {
                        if (entry.count < 50) {
                            message += `\`\`${i + 1}. \`\`<a:redlight:1211374559224135700> <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                        }
                        else if (entry.count >= 50 && entry.count < 75) {
                            message += `\`\`${i + 1}. \`\`<:dogsmile:1230441707766808608> <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                        } else {
                            message += `\`\`${i + 1}. \`\`<a:6797evolvingbadgeboost:1234205150898425898> <@${entry.user}> **• ${entry.count}** Nachrichten gesendet.\n`
                        }
                    }
                }
                const embed = new EmbedBuilder({
                    title: 'Weekly Messages Leaderboard',
                    description: message,
                    color: Colors.Aqua
                })

                channel.send({ embeds: [embed] })
            }
        }

        await checkAndDelete()
        setInterval(checkAndDelete, 60000)
    }
})