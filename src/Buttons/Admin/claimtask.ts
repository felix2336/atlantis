import { Button } from 'dcbot'
import { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, GuildMember } from 'discord.js'

export default new Button ({
    id: 'taskclaim',

    async execute(interaction: ButtonInteraction) {
        const member = interaction.member as GuildMember
        if (!member.roles.cache.has('1146117778483450048')) {
            interaction.reply({ content: 'Dazu bist du nicht berechtigt', ephemeral: true })
            return
        } 

        const message = await interaction.message.fetch()
        if (!message) {
            interaction.reply({ content: 'Ein unerwarteter Fehler ist aufgetreten', ephemeral: true })
            return
        } 

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

        const embed = new EmbedBuilder(message.embeds[0].data)
        embed.setFields([{ name: 'Wird bearbeitet von', value: `${interaction.user}` }])
        //@ts-ignore
        await message.edit({ embeds: [embed], components: [row] })
        interaction.reply({ content: 'Du hast diese Aufgabe erfolgreich geclaimt', ephemeral: true })
    }
})