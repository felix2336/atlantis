const { CommandInteraction, Client, EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js')
const DB = require('../../Schemas/messages')

function getDay(dayNumber) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[dayNumber];
}

module.exports = {
    name: 'messages',
    description: 'Lasse dir Nachrichten anzeigen von dir, einem anderen User oder das Leaderboard',
    dev: true,
    options: [
        {
            name: 'leaderboard',
            description: 'Lasse dir das Leaderboard dieser Woche anzeigen',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'type',
                    description: 'Welchen typ möchtest du sehen?',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        { name: 'Heutiges Leaderboard', value: 'daily' },
                        { name: 'Leaderboard dieser Woche', value: 'weekly' }
                    ],
                    required: true
                }
            ]
        }
    ],

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */

    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand()
        const day = new Date().getDay()

        switch (subcommand) {
            case 'leaderboard': {
                const type = interaction.options.getString('type')
                switch (type) {
                    case 'daily': {
                        const Users = await DB.find({})
                        const leaderboard = []

                        for (const User of Users) {
                            const messages = User.messagesSent[getDay(day)]
                            leaderboard.push({ user: User.user, count: messages })
                        }

                        const sortedLeaderboard = leaderboard.sort((a, b) => b.count - a.count)
                        let message = ''
                        sortedLeaderboard.forEach((user, index) => {
                            message += `\`\`${index + 1}. \`\` <@${user.user}> **• ${user.count}** Nachrichten gesendet.`
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
                        const Users = await DB.find({})
                        const leaderboard = []

                        for(const User of Users){
                            leaderboard.push({user: User.user, count: User.total})
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
                        interaction.reply({embeds: [embed]})
                    }
                }
                break;
            }
        }
    }
}