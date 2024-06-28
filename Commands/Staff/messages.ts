import { ChatInputCommandInteraction, Client, EmbedBuilder, Colors, GuildMember, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { MessageUser } from '../../contents';
import { SlashCommand } from 'dcbot'
import { readFileSync } from 'fs'

export default new SlashCommand({
    data: new SlashCommandBuilder()
        .setName('messages')
        .setDescription("Lasse dir Nachrichten anzeigen von dir, einem anderen User oder das Leaderboard")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addSubcommand(input => input
            .setName('leaderboard')
            .setDescription('Lasse dir das Leaderboard dieser Woche anzeigen')
            .addStringOption(input => input.setName('type').setDescription('Welches Leaderboard möchtest du sehen?').addChoices({ name: 'Heutiges Leaderboard', value: 'daily' }, { name: 'Leaderboard dieser Woche', value: 'weekly' }).setRequired(true))
        ),

    async execute(interaction, client) {
        const DB = JSON.parse(readFileSync('./JSON/messages.json', 'utf8')) as MessageUser[]
        const member = interaction.member as GuildMember
        if (!member.roles.cache.has('1156298949301379212')){
            interaction.reply({ content: 'Du musst im Team sein, um diesen Befehl nutzen zu können', ephemeral: true })
            return
        }
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand()
        const day = new Date().getDay()

        switch (subcommand) {
            case 'leaderboard': {
                //@ts-ignore
                const type = interaction.options.getString('type')
                switch (type) {
                    case 'daily': {
                        const leaderboard: { user: string, count: number }[] = []

                        for (const UserData of DB) {
                            const User = new MessageUser().assignData(UserData)
                            const messages = User.getMessagesOfDay(day)
                            leaderboard.push({ user: User.userid!, count: messages })
                        }

                        const sortedLeaderboard = leaderboard.sort((a, b) => b.count - a.count)
                        let message = ''
                        sortedLeaderboard.forEach((user, index) => {
                            message += `\`\`${index + 1}. \`\` <@${user.user}> **• ${user.count}** Nachrichten gesendet.\n`
                        })
                        const embed = new EmbedBuilder({
                            title: 'Daily Messages Leaderboard',
                            description: message,
                            color: Colors.Aqua
                        })
                        interaction.reply({ embeds: [embed] })
                        break;
                    }
                    case 'weekly': {
                        const leaderboard: any[] = []

                        for (const UserData of DB) {
                            const User = new MessageUser().assignData(UserData)
                            leaderboard.push({ user: User.userid, count: User.getTotalMessages() })
                        }

                        const sorted = leaderboard.sort((a, b) => b.count - a.count)
                        let message = ''

                        for (let i = 0; i < leaderboard.length; i++) {
                            const entry = leaderboard[i]
                            const member = await interaction.guild!.members.fetch(entry.user)

                            if (!member) {
                                interaction.reply({ content: 'Etwas ist schiefgelaufen', ephemeral: true })
                                return
                            }
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
                        interaction.reply({ embeds: [embed] })
                    }
                }
                break;
            }
        }
    }
})