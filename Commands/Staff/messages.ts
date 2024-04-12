import { CommandInteraction, Client, EmbedBuilder, ApplicationCommandOptionType, Colors, GuildMember, Collection, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import MessageUser from '../../Classes/staff-messages';
import {readFileSync} from 'fs'

export default {
    data: new SlashCommandBuilder()
        .setName('messages')
        .setDescription("Lasse dir Nachrichten anzeigen von dir, einem anderen User oder das Leaderboard")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addSubcommand(input => input
            .setName('leaderboard')
            .setDescription('Lasse dir das Leaderboard dieser Woche anzeigen')
            .addStringOption(input => input.setName('type').setDescription('Welches Leaderboard möchtest du sehen?').addChoices({ name: 'Heutiges Leaderboard', value: 'daily' }, { name: 'Leaderboard dieser Woche', value: 'weekly' }).setRequired(true))
        ),

    async execute(interaction: CommandInteraction, client: Client) {
        const DB = JSON.parse(readFileSync('./JSON/messages.json', 'utf8')) as MessageUser[]
        const member = interaction.member as GuildMember
        if (!member.roles.cache.has('1156298949301379212')) return interaction.reply({ content: 'Du musst im Team sein, um diesen Befehl nutzen zu können', ephemeral: true })
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand()
        const day = new Date().getDay()

        switch (subcommand) {
            case 'leaderboard': {
                //@ts-ignore
                const type = interaction.options.getString('type')
                switch (type) {
                    case 'daily': {
                        const leaderboard: {user: string, count: number}[] = []

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

                            if (!member) return interaction.reply({ content: 'Etwas ist schiefgelaufen', ephemeral: true })
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
                        interaction.reply({ embeds: [embed] })
                    }
                }
                break;
            }
        }
    }
}


function getDay(dayNumber: number) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[dayNumber];
}