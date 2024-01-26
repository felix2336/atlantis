const { ButtonInteraction } = require('discord.js')

module.exports = {
    id: 'taskfinished',

    /**
     * @param {ButtonInteraction} interaction 
     */

    async execute(interaction) {
        if (!interaction.member.roles.cache.has('1146117778483450048')) return interaction.reply({ content: 'Dazu bist du nicht berechtigt', ephemeral: true })
        await interaction.message.delete()

        interaction.reply({ content: 'Nice Nice, wieder eine Task weniger C:', ephemeral: true })
    }
}