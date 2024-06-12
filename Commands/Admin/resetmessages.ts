import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Colors, TextChannel, Guild } from "discord.js";
import { Channels, MessageUser } from "../../contents";
import { SlashCommand } from 'contents'
import { readFileSync, writeFileSync } from 'fs'

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('reset-messages')
        .setDescription('Imitiere das Message Counter Reset Event')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const channel = client.channels.cache.get(Channels.message_leaderboard) as TextChannel
        const guild = client.guilds.cache.get('1146113684435898439') as Guild

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

        await channel.send({ embeds: [embed] })
        interaction.reply({ content: 'Message Leaderboard erfolgreich zurückgesetzt!', ephemeral: true })
    },
}
export default command