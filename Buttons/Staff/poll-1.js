const { ButtonInteraction } = require('discord.js')
const { readFileSync, writeFileSync } = require('fs')

module.exports = {
    id: 'poll-1',

    /**
     * @param {ButtonInteraction} interaction 
     */

    async execute(interaction) {
        const polls = JSON.parse(readFileSync('./JSON/polls.json', 'utf8'))
        const poll = polls[interaction.message.id]

        if (poll.multiple) {
            if (poll.option1.some(u => u == interaction.user.id)) return interaction.reply({ content: 'Du hast bereits für diese Option abgestimmt.', ephemeral: true })
            poll.option1.push(interaction.user.id)
            interaction.message.embeds[0].fields[0].value = `${poll.option1.length} Stimmen`
            await interaction.message.edit({embeds: [interaction.message.embeds[0]]})
            writeFileSync('./JSON/polls.json', JSON.stringify(polls, null, 2), 'utf8')
            interaction.reply({content: 'Du hast erfolgreich abgestimmt.', ephemeral: true})
        } else {
            if (poll.participants.some(u => u == interaction.user.id)) return interaction.reply({ content: 'Du hast an dieser Umfrage bereits teilgenommen.', ephemeral: true })
            poll.participants.push(interaction.user.id)
            poll.option1.push(interaction.user.id)
            interaction.message.embeds[0].fields[0].value = `${poll.option1.length} Stimmen`
            await interaction.message.edit({ embeds: [interaction.message.embeds[0]] })
            writeFileSync('./JSON/polls.json', JSON.stringify(polls, null, 2), 'utf8')
            interaction.reply({ content: 'Du hast erfolgreich abgestimmt.', ephemeral: true })
        }
    }
}