const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
    name: 'withdraw',
    description: 'Hebe Geld von deinem Bankkonto ab',
    permission: 'SendMessages',
    cmdid: '1181332198016688186',
    dev: true,
    options: [
        {
            name: 'amount',
            description: 'Wie viel möchtest du abheben? (all für alles)',
            type: ApplicationCommandOptionType.Number,
            choices: [
                {
                    name: 'all',
                    value: -1
                },
            ],
            required: true,
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        let User = await Casino.findOne({ user: interaction.user.id })

        if (!User || User.bank <= 0) {
            const embed = new EmbedBuilder({
                title: 'Abhebung fehlgeschlagen',
                description: 'Du kannst nichts von deinem Bankkonto abheben, weil dort kein Geld drauf ist.',
                color: 0xff1414
            })
            interaction.reply({ embeds: [embed] })
            return;
        }
        let amount = interaction.options.getNumber('amount')

        if (amount > User.bank) {
            const embed = new EmbedBuilder({
                title: 'Abhebung fehlgeschlagen',
                description: 'Du willst mehr Geld abheben, als du hast.',
                color: 0xff1414
            })
            interaction.reply({ embeds: [embed] })
            return;
        }

        if (amount == -1) amount = User.bank

        const embed = new EmbedBuilder({
            title: 'Abhebung erfolgreich',
            description: `Du hast erfolgreich 💰${amount} von der Bank abgehoben.`,
            color: 0x77ff00
        })
        User.bank -= amount
        User.wallet += amount
        await User.save()
        interaction.reply({ embeds: [embed] })
    }
}