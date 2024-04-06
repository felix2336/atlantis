import { ButtonInteraction, GuildMember } from 'discord.js'

export default {
    id: 'taskfinished',

    async execute(interaction: ButtonInteraction) {
        const member = interaction.member as GuildMember
        if (!member.roles.cache.has('1146117778483450048')) return interaction.reply({ content: 'Dazu bist du nicht berechtigt', ephemeral: true })
        await interaction.message.delete()

        interaction.reply({ content: 'Nice Nice, wieder eine Task weniger C:', ephemeral: true })
    }
}