const { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')

module.exports = {
    id: 'taskclaim',

    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction) {
        if (!interaction.member.roles.cache.has('1146117778483450048')) return interaction.reply({ content: 'Dazu bist du nicht berechtigt', ephemeral: true })

        const message = await interaction.message.fetch()
        if (!message) return interaction.reply({ content: 'Ein unerwarteter Fehler ist aufgetreten', ephemeral: true })

        message.components[0].components.pop()

        const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder({
                label: 'Erledigt',
                customId: 'taskfinished',
                style: 3
            }),
            new ButtonBuilder({
                label: 'Update',
                style: 1,
                customId: 'task_update',
            })
        ])

        const embed = new EmbedBuilder(message.embeds[0])
        embed.setFields([{ name: 'Wird bearbeitet von', value: `${interaction.user}` }])
        await message.edit({ embeds: [embed], components: [row] })
        interaction.reply({ content: 'Du hast diese Aufgabe erfolgreich geclaimt', ephemeral: true })
    }
}