const { CommandInteraction, ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
    name: 'reset',
    description: 'Setze das Konto eines Users zurück',
    permission: 'Administrator',
    options: [
        {
            name: 'target',
            description: 'Wähle den User, dessen Konto du zurücksetzen möchtest',
            type: ApplicationCommandOptionType.User,
            required: true
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const target = interaction.options.getMember('target')
        let User = await Casino.findOne({ user: target.id })

        const minRole = interaction.guild.roles.cache.get('1170957646942191688')
        if (interaction.member.roles.highest.position < minRole.position) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: 'Du hast nicht die erforderlichen Berechtigungen für diesen Command', color: Colors.DarkRed, timestamp: new Date() })] })


        if (!User) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: 'Dieser User besitzt kein Konto!', color: Colors.Yellow, timestamp: new Date() })] })

        User.wallet = 0
        User.bank = 0

        await User.save()

        interaction.reply({ embeds: [new EmbedBuilder({ title: 'Erfolg', description: `Du hast erfolgreich das Konto von ${target} auf 0 zurückgesetzt`, color: Colors.DarkGreen, timestamp: new Date() })] })
    }
}