const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const Casino = require('../../Schemas/casino')

module.exports = {
    name: 'coinflip',
    description: 'Wirf eine Münze und erhalte mit etwas Glück ein wenig Geld',
    permission: 'SendMessages',
    options: [
        {
            name: 'heads',
            description: 'Setze darauf, dass die Münze Kopf zeigt',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'amount',
                    description: 'Wie viel Geld möchtest du setzen?',
                    type: ApplicationCommandOptionType.Number,
                    required: true
                }
            ]
        },
        {
            name: 'tails',
            description: 'Setze darauf, dass die Münze zahl zeigt',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'amount',
                    description: 'Wie viel Geld möchtest du setzen?',
                    type: ApplicationCommandOptionType.Number,
                    required: true
                }
            ]
        }
    ],

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        let User = await Casino.findOne({ user: interaction.user.id })

        const subcommand = interaction.options.getSubcommand()
        switch (subcommand) {
            case 'heads': {
                const bid = parseInt(interaction.options.getNumber('amount'))
                if (bid <= 0) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Münzwurf fehlgeschlagen', description: 'Du musst mindestens 💰1 bieten', color: 0xff1414 })] })
                if (bid > User.wallet) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Münzwurf fehlgeschlagen', description: 'Du kannst nicht mehr bieten, als du hast', color: 0xff1414 })] })
                const random = Math.floor(Math.random() * 2)
                if (random == 1) {
                    const embed = new EmbedBuilder({
                        title: 'Guter Wurf',
                        description: `Die Münze ist auf Kopf gelandet. Somit hast du 💰${bid} Plus gemacht`,
                        color: 0x77ff00
                    })
                    User.wallet += bid
                    await User.save()
                    interaction.reply({ embeds: [embed] })
                    return
                } else {
                    const embed = new EmbedBuilder({
                        title: 'Schlechter Wurf',
                        description: `Die Münze ist auf Zahl gelandet. Somit hast du leider 💰${bid} verloren`,
                        color: 0xff1414
                    })
                    User.wallet -= bid
                    await User.save()
                    interaction.reply({ embeds: [embed] })
                    return
                }
                break;
            }
            case 'tails': {
                const bid = parseInt(interaction.options.getNumber('amount'))
                if (bid <= 0) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Münzwurf fehlgeschlagen', description: 'Du musst mindestens 💰1 bieten', color: 0xff1414 })] })
                if (bid > User.wallet) return interaction.reply({ embeds: [new EmbedBuilder({ title: 'Münzwurf fehlgeschlagen', description: 'Du kannst nicht mehr bieten, als du hast', color: 0xff1414 })] })
                const random = Math.floor(Math.random() * 2)
                if (random == 1) {
                    const embed = new EmbedBuilder({
                        title: 'Guter Wurf',
                        description: `Die Münze ist auf Zahl gelandet. Somit hast du 💰${bid} Plus gemacht`,
                        color: 0x77ff00
                    })
                    User.wallet += bid
                    await User.save()
                    interaction.reply({ embeds: [embed] })
                    return
                } else {
                    const embed = new EmbedBuilder({
                        title: 'Schlechter Wurf',
                        description: `Die Münze ist auf Kopf gelandet. Somit hast du leider 💰${bid} verloren`,
                        color: 0xff1414
                    })
                    User.wallet -= bid
                    await User.save()
                    interaction.reply({ embeds: [embed] })
                    return
                }
                break;
            }
        }
    }
}