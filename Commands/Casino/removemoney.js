const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
    name: 'removemoney',
    description: 'Entferne Geld von dem Konto eines Users',
    permission: 'Administrator',
    dev: true,
    options: [
        {
            name: 'target',
            description: 'Wähle den User von dem du Geld entfernen möchtest',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'amount',
            description: 'Gib an wie viel Geld du entfernen möchtest',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'type',
            description: 'Von wo möchtest du Geld entfernen? (Wallet/Bank)',
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: 'Wallet', value: 'wallet' },
                { name: 'Bank', value: 'bank' }
            ],
            required: true
        }
    ],

    /**
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {
        const target = interaction.options.getMember('target')
        let User = await Casino.findOne({ user: target.id })
        if (!User) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Account nicht gefunden', description: 'Der Account dieses Users wurde nicht gefunden', color: Colors.Yellow, timestamp: new Date() })] })
        const minRole = interaction.guild.roles.cache.get('1170957646942191688')
        if (interaction.member.roles.highest.position < minRole.position) return interaction.reply({embeds: [new EmbedBuilder({title: 'Fehler', description: 'Du hast nicht die erforderlichen Berechtigungen für diesen Command', color: Colors.DarkRed, timestamp: new Date()})]})
        const amount = parseInt(interaction.options.getNumber('amount'))
        const type = interaction.options.getString('type')
        if (User[type] < amount) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: 'Der User hat nicht so viel Geld.', color: Colors.Yellow, timestamp: new Date() })] })

        User[type] -= amount
        await User.save()

        interaction.reply({ embeds: [new EmbedBuilder({ title: 'Erfolg', description: `Du hast erfolgreich der ${type} von ${target} ${amount} abgezogen`, color: Colors.DarkGreen })] })
    }
}