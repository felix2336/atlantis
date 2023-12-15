const { CommandInteraction } = require('discord.js')

module.exports = {
    name: 'weihnachtsrolle',
    description: 'Erhalte die Weihnachtsrolle für das Jahr 2023',
    dev: true,

    /**
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {
        const role = ''

        if (interaction.member.roles.cache.has(role)) return interaction.reply({ content: `Du hast die <@&${role}> Rolle bereits`, ephemeral: true })
        await interaction.member.roles.add(role)
        await interaction.reply({content: `Du hast erfolgreich die <@&${role}> Rolle erhalten.\nDas Serverteam wünscht dir eine schöne Weihnachtszeit!`, ephemeral: true})
    }
}