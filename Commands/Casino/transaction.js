const { CommandInteraction, ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
    name: 'transaction',
    description: 'Transferiere Geld von einem Konto auf ein anderes',
    permission: 'Administrator',
    dev: true,
    options: [
        {
            name: 'amount',
            description: 'Wie viel möchtest du verschieben?',
            type: ApplicationCommandOptionType.Number,
            requried: true
        },
        {
            name: 'user1',
            description: 'Von welchem User möchtest du Geld nehmen?',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'user1type',
            description: 'Von wo möchtest du das Geld nehmen?',
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: 'Wallet', value: 'wallet' },
                { name: 'Bank', value: 'bank' },
            ],
            required: true
        },
        {
            name: 'user2',
            description: 'Welchem User möchtest du das Geld geben?',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'user2type',
            description: 'Wo möchtest du das Geld draufzahlen?',
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: 'Wallet', value: 'wallet' },
                { name: 'Bank', value: 'bank' },
            ],
            required: true
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const user1 = interaction.options.getMember('user1')
        const user2 = interaction.options.getMember('user2')
        const user1type = interaction.options.getString('user1type')
        const user2type = interaction.options.getString('user2type')
        const amount = parseInt(interaction.options.getNumber('amount'))

        let User1 = await Casino.findOne({ user: user1.id })
        if (!User1) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: 'Dieser User hat kein Konto, von dem du Geld nehmen kannst', color: Colors.Yellow, timestamp: new Date() })] })
        if (User1[user1type] < amount) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Fehler', description: `Der User hat nicht so viel Geld`, color: Colors.Yellow, timestamp: new Date() })] })

        let User2 = await Casino.findOne({ user: user2.id })
        if (!User2) {
            User2 = await Casino.create({
                user: `${user2.id}`,
                wallet: 0,
                bank: 0,
                inventory: {}
            })
        }

        User1[user1type] -= amount
        User2[user2type] += amount

        await User1.save()
        await User2.save()

        interaction.reply({embeds: [new EmbedBuilder({title: 'Erfolg', description: `Du hast erfolgreich ${amount} von ${user1}'s ${user1type} auf ${user2}'s ${user2type} verschoben.`, color: Colors.DarkGreen, timestamp: new Date()})]})
    }
}