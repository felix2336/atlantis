import { ButtonInteraction } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'
import StaffPoll from '../../Classes/staff-poll'

export default {
    id: 'poll-1',

    async execute(interaction: ButtonInteraction) {
        let polls = JSON.parse(readFileSync('./JSON/polls.json', 'utf8')) as StaffPoll[]
        const data = polls.find(p => p.id == interaction.message.id)
        if(!data) return interaction.reply({content: 'Diese Umfrage ist nicht mehr verfügbar!', ephemeral: true});

        const poll = new StaffPoll().assignData(data)

        if (poll.multiple) {
            if (poll.options[0].votes.some((u: string) => u == interaction.user.id)) return interaction.reply({ content: 'Du hast bereits für diese Option abgestimmt.', ephemeral: true })
            poll.options[0].votes.push(interaction.user.id)
            interaction.message.embeds[0].fields[0].value = `${poll.options[0].votes.length} Stimmen`
            await interaction.message.edit({embeds: [interaction.message.embeds[0]]})
            writeAndReply()
        } else {
            if (poll.participants.some((u: string) => u == interaction.user.id)) return interaction.reply({ content: 'Du hast an dieser Umfrage bereits teilgenommen.', ephemeral: true })
            poll.participants.push(interaction.user.id)
            poll.options[0].votes.push(interaction.user.id)
            interaction.message.embeds[0].fields[0].value = `${poll.options[0].votes.length} Stimmen`
            await interaction.message.edit({ embeds: [interaction.message.embeds[0]] })
            writeAndReply()
        }

        function writeAndReply() {
            polls = polls.filter(p => p.id != interaction.message.id)
            polls.push(poll)
            writeFileSync('./JSON/polls.json', JSON.stringify(polls, null, 2), 'utf8')
            interaction.reply({ content: 'Du hast erfolgreich abgestimmt.', ephemeral: true })
        }
    }
}