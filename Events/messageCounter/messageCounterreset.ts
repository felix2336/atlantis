import { Events, Client, EmbedBuilder, Message, GuildMember, Colors, Guild, TextChannel } from 'discord.js'
import MessageUser from '../../Classes/staff-messages'
import {readFileSync, writeFileSync} from 'fs'

export default {
    name: Events.ClientReady,
    // name: Events.MessageCreate,

    async execute(client: Client) {
        // if (message.author.id != '773072144304963624') return;
        // if(message.content != 'messageCounterReset') return;
        // await message.react('✅')
        const channel = client.channels.cache.get('1196886539637112923') as TextChannel
        const guild = client.guilds.cache.get('1146113684435898439') as Guild
        const checkAndDelete = async () => {
            const date = new Date()
            if (date.getDay() == 0 && date.getHours() == 23 && date.getMinutes() == 59) {
                let DB = JSON.parse(readFileSync('../JSON/messages.json', 'utf8')) as MessageUser[]
                const leaderboard: {user: string, count: number}[] = []

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
            }
        }

        await checkAndDelete()
        setInterval(checkAndDelete, 60000)
    }
}