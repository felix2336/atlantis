const { ButtonInteraction } = require('discord.js')

module.exports = {
    id: 'taskclaim',

    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction){
        if(!interaction.member.roles.cache.has('1146117778483450048')) return interaction.reply({ content: 'Dazu bist du nicht berechtigt', ephemeral: true })

        const message = await interaction.message.fetch()
        if(!message) return interaction.reply({content: 'Ein unerwarteter Fehler ist aufgetreten', ephemeral: true})

        message.components[0].components.pop()

        const embed = message.embeds[0]
        embed.fields = [{name: 'Wird bearbeitet von', value: `${interaction.user}`}]
        await message.edit({embeds: [embed], components: message.components})
        interaction.reply({content: 'Du hast diese Aufgabe erfolgreich geclaimt', ephemeral: true})
    }
}